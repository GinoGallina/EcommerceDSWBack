import { Request, Response } from "express";
import { CategoryService } from "../services/CategoryService";
import { ICategoryCreateRequest, ICategoryGetAllResponse, ICategoryResponse, ICategoryUpdateRequest } from "../types/ICategory";
import { inject, injectable } from "tsyringe";
import { BaseController } from "./BaseController";
import { IGenericGetAllRequest } from "../types/shared/IBaseRequest";
import { IGenericDeleteResponse } from "../types/shared/IBaseResponse";

@injectable()
export class CategoryController extends BaseController<
	CategoryService,
	IGenericGetAllRequest,
	ICategoryGetAllResponse,
	ICategoryResponse,
	ICategoryCreateRequest,
	ICategoryResponse,
	ICategoryUpdateRequest,
	ICategoryResponse,
	IGenericDeleteResponse
> {
	constructor(@inject("CategoryService") private categoryService: CategoryService) {
		super(categoryService);
	}

	getCombo = async (_: Request, res: Response) => {
		const response = await this.categoryService.getCombo();
		res.status(response.success ? 200 : (response.error?.code ?? 500)).json(response);
	};
}
