import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { IUserCreateRequest, IUserGetAllResponse, IUserGetComboRequest, IUserResponse, IUserUpdateRequest } from "../types/IUser";
import { IGenericGetAllRequest } from "../types/shared/IBaseRequest";
import { inject, injectable } from "tsyringe";
import { BaseController } from "./BaseController";
import { IGenericDeleteResponse } from "../types/shared/IBaseResponse";

@injectable()
export class UserController extends BaseController<
	UserService,
	IGenericGetAllRequest,
	IUserGetAllResponse,
	IUserResponse,
	IUserCreateRequest,
	IUserResponse,
	IUserUpdateRequest,
	IUserResponse,
	IGenericDeleteResponse
> {
	constructor(@inject("UserService") private userService: UserService) {
		super(userService);
	}

	getCombo = async (req: Request<IUserGetComboRequest>, res: Response) => {
		const response = await this.userService.getCombo(req.body);
		res.status(response.success ? 200 : (response.error?.code ?? 500)).json(response);
	};
}
