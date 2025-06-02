import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";
import {
	IProductCreateRequest,
	IProductGetAllResponse,
	IProductGetOneResponse,
	IProductResponse,
	IProductUpdateRequest,
} from "../types/IProduct";
import { IGenericGetAllRequest } from "../types/shared/IBaseRequest";
import { inject, injectable } from "tsyringe";
import { BaseController } from "./BaseController";
import { IGenericDeleteResponse } from "../types/shared/IBaseResponse";

@injectable()
export class ProductController extends BaseController<
	ProductService,
	IGenericGetAllRequest,
	IProductGetAllResponse,
	IProductGetOneResponse,
	IProductCreateRequest,
	IProductResponse,
	IProductUpdateRequest,
	IProductResponse,
	IGenericDeleteResponse
> {
	constructor(@inject("ProductService") private productService: ProductService) {
		super(productService);
	}

	getDetails = async (req: Request<{ id: string }>, res: Response) => {
		const response = await this.service.getDetails(req.params.id);
		res.status(response.success ? 200 : (response.error?.code ?? 500)).json(response);
	};

	getAllMyProducts = async (req: Request<object, object, object, IGenericGetAllRequest>, res: Response) => {
		const response = await this.productService.getAllMyProducts(req.query);
		res.status(response.success ? 200 : (response.error?.code ?? 500)).json(response);
	};
}
