import { Router } from "express";
import { container } from "tsyringe";
import { OrderController } from "../controllers/OrderController";
import { authorizeRoles } from "../middleware/Roles/AuthorizeRoles";
import { RoleEnum } from "../types/IRole";

export const OrderRouter = () => {
	const router = Router();

	const orderController = container.resolve(OrderController);

	router.get("/getAll", orderController.getAll.bind(orderController));
	router.get("/getOne/:id", orderController.getOne.bind(orderController));
	router.post("/create", orderController.create.bind(orderController));
	router.post("/cancelProduct/:id", orderController.cancelProduct.bind(orderController));
	router.post("/cancelOrder/:id", orderController.cancelOrder.bind(orderController));
	router.post("/delete/:id", authorizeRoles(RoleEnum.Admin), orderController.delete.bind(orderController));

	return router;
};
