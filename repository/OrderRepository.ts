import { Repository } from "typeorm";
import { Order } from "../models/database/Order";
import { createValidOrderColumns, getAllPaginationOptions } from "../utils/RepositoryHelpers";
import { IGenericGetAllRequest } from "../types/shared/IBaseRequest";
import { inject, injectable } from "tsyringe";
import { AuthService } from "../services/AuthService";
import { RoleEnum } from "../types/IRole";
import { BaseRepository } from "./BaseRepository";

@injectable()
export class OrderRepository extends BaseRepository<Order> {
	constructor(
		@inject("OrderTypeORMRepository")
		private readonly orderRepository: Repository<Order>,
		@inject("AuthService")
		private readonly authService: AuthService,
	) {
		super(Order, orderRepository);
	}

	async getAll(query: IGenericGetAllRequest): Promise<{ items: Order[]; totalCount: number }> {
		const validOrderColumns = createValidOrderColumns<Order>(["TotalPrice", "CreatedAt"]);
		const { skip, take, order } = getAllPaginationOptions<Order>(query, validOrderColumns);
		const token = this.authService.getToken();

		// Using createQueryBuilder to get deleted Users data
		const qb = this.orderRepository
			.createQueryBuilder("order")
			.withDeleted()
			.leftJoinAndSelect("order.PaymentType", "paymentType")
			.leftJoinAndSelect("order.User", "user")
			.leftJoinAndSelect("order.OrderItems", "orderItems")
			.where("order.DeletedAt IS NULL");

		if (!token.roles.includes(RoleEnum.Admin)) {
			qb.andWhere("order.UserId = :userId", { userId: Number(token.id) });
		}

		for (const [column, direction] of Object.entries(order)) {
			qb.addOrderBy(`order.${column}`, direction.toUpperCase() as "ASC" | "DESC");
		}

		qb.skip(skip).take(take);

		const [items, totalCount] = await qb.getManyAndCount();
		return { items, totalCount };
	}

	async getByIdIncludingDeletedRelations(id: number): Promise<Order | null> {
		// Using createQueryBuilder to get deleted Users, Product and Payement Type data
		const query = this.orderRepository
			.createQueryBuilder("order")
			.withDeleted()
			.leftJoinAndSelect("order.PaymentType", "paymentType")
			.leftJoinAndSelect("order.OrderItems", "orderItems")
			.leftJoinAndSelect("orderItems.Product", "product")
			.leftJoinAndSelect("product.User", "productUser")
			.leftJoinAndSelect("order.User", "user")
			.where("order.Id = :id", { id })
			.andWhere("order.DeletedAt IS NULL");

		const order = await query.getOne();
		return order ?? null;
	}
}
