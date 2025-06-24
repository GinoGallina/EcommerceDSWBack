import { DataSource, In, Repository } from "typeorm";
import { IBaseResponse } from "../types/shared/IBaseResponse";
import { createErrorResponse, createSuccessResponse } from "../utils/ResponseHelpers";
import { Messages } from "../const/Messages";
import { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse } from "../types/IAuth";
import { UserService } from "./UserService";
import { Role } from "../models/database/Role";
import { RoleEnum } from "../types/IRole";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IUserToken } from "../types/shared/IToken";
import { ContextService } from "./ContextService";
import { UserRepository } from "../repository/UserRepository";

@injectable()
export class AuthService {
	constructor(
		@inject("DataSource") private readonly db: DataSource,
		@inject("UserService") private readonly userService: UserService,
		@inject("UserRepository") private readonly userRepository: UserRepository,
		@inject("RoleTypeORMRepository") private readonly roleRepository: Repository<Role>,
	) {}

	buildToken(id: number, roles: string[], address: string, email: string, username: string) {
		const expiresInSeconds = 24 * 60 * 60;

		const token = jwt.sign({ id, roles, address, email, username }, process.env.JWT_SECRET!, {
			expiresIn: expiresInSeconds,
		});

		return token;
	}

	getToken(): IUserToken {
		const req = ContextService.getRequest();

		if (!req.auth) {
			throw new Error("No se ha podido encontrar el token");
		}

		return req.auth as IUserToken;
	}

	async register(rq: IRegisterRequest): Promise<IBaseResponse<IRegisterResponse | null>> {
		// Crear queryRunner
		const queryRunner = this.db.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();
		const manager = queryRunner.manager;
		try {
			// Validate request
			const foundRoles = await this.roleRepository.findBy({
				Id: In(rq.Roles.map((x) => Number(x))),
			});

			if (foundRoles.some((role) => role.Name === RoleEnum.Admin)) {
				await queryRunner.rollbackTransaction();
				return createErrorResponse("Error al registrar el usuario", {
					code: 400,
					message: "No puede crear un usuario Administrador",
				});
			}

			// Create User
			const user = await this.userService.register(rq, queryRunner, manager);

			if (!user.success && user.error) {
				return createErrorResponse("Error al registrar el usuario", {
					code: user.error.code,
					message: user.error?.message,
				});
			}

			if (!user || !user.data) throw new Error("Error interno del servidor");

			await queryRunner.commitTransaction();

			const token = this.buildToken(
				Number(user.data.id),
				user.data.roles,
				user.data.address,
				user.data.email,
				user.data.username,
			);

			return createSuccessResponse<IRegisterResponse>(Messages.CRUD.EntityCreated("Usuario", true), {
				token,
			});
		} catch (e) {
			console.log(e);
			await queryRunner.rollbackTransaction();
			return createErrorResponse("Error inesperado registrando al usuario");
		}
	}

	async login(req: ILoginRequest): Promise<IBaseResponse<ILoginResponse | null>> {
		try {
			// Check if user exists
			const user = await this.userRepository.findOneBy(
				{ Email: req.email },
				{
					relations: {
						Roles: true,
					},
				},
			);

			if (user == null) {
				return createErrorResponse("Error al hacer logín", {
					code: 401,
					message: Messages.Error.EntityNotFound("Usuario"),
				});
			}

			if (!(await bcrypt.compare(req.password, user.Password))) {
				return createErrorResponse("Error al hacer logín", {
					code: 401,
					message: "Contraseña incorrecta",
				});
			}

			// JWT
			const token = this.buildToken(
				user.Id!,
				user.Roles.map((x) => x.Name),
				user.Address,
				user.Email,
				user.Username,
			);

			return createSuccessResponse<ILoginResponse>("Inicio de sesión correcto", {
				token,
			});
		} catch (e) {
			console.log(e);
			return createErrorResponse("Error inesperado al hacer login");
		}
	}
}
