import { IBaseResponse } from "../types/shared/IBaseResponse";
import { createErrorResponse } from "../utils/ResponseHelpers";
import { IGetCombo } from "../types/shared/IGetCombo";
import { RoleRepository } from "../repository/RoleRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class RoleService {
	constructor(@inject("RoleRepository") private readonly roleRepository: RoleRepository) {}

	async getCombo(): Promise<IBaseResponse<IGetCombo | null>> {
		try {
			const items = await this.roleRepository.getCombo();
			return {
				message: "",
				data: {
					items,
				},
				error: null,
				success: true,
			};
		} catch (e) {
			console.log(e);
			return createErrorResponse("Error obteniendo combo de roles");
		}
	}
}
