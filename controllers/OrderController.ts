import { OrderService } from "../services/OrderService";
import { inject, injectable } from "tsyringe";
import { BaseController } from "./BaseController";
import {
	IOrderCancelProductRequest,
	IOrderCreateRequest,
	IOrderGetAllResponse,
	IOrderGetOneResponse,
	IOrderResponse,
	IOrderUpdateRequest,
} from "../types/IOrder";
import { IGenericGetAllRequest } from "../types/shared/IBaseRequest";
import { IGenericDeleteResponse } from "../types/shared/IBaseResponse";
import { Request, Response } from "express";

@injectable()
export class OrderController extends BaseController<
	OrderService,
	IGenericGetAllRequest,
	IOrderGetAllResponse,
	IOrderGetOneResponse,
	IOrderCreateRequest,
	IOrderResponse,
	IOrderUpdateRequest,
	IOrderResponse,
	IGenericDeleteResponse
> {
	constructor(@inject("OrderService") private orderService: OrderService) {
		super(orderService);
	}

	cancelProduct = async (req: Request<{ id: string }, object, IOrderCancelProductRequest>, res: Response) => {
		const response = await this.orderService.cancelProduct(req.params.id, req.body);
		res.status(response.success ? 200 : (response.error?.code ?? 500)).json(response);
	};

	cancelOrder = async (req: Request<{ id: string }>, res: Response) => {
		const response = await this.orderService.cancelOrder(req.params.id);
		res.status(response.success ? 200 : (response.error?.code ?? 500)).json(response);
	};
}
