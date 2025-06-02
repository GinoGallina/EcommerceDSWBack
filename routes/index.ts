import { Router } from "express";
import { CategoryRouter } from "./CategoryRoutes";
import { ProductRouter } from "./ProductRoutes";
import { UserRouter } from "./UserRoutes";
import { AuthRouter } from "./AuthRoutes";
import { RoleRouter } from "./RoleRoutes";
import { PaymentTypeRouter } from "./PaymentTypeRoutes";
import { OrderRouter } from "./OrderRoutes";
import { ReviewRouter } from "./ReviewRoutes";

export default () => {
	const router = Router();

	router.use("/category", CategoryRouter());
	router.use("/product", ProductRouter());
	router.use("/user", UserRouter());
	router.use("/auth", AuthRouter());
	router.use("/role", RoleRouter());
	router.use("/paymentType", PaymentTypeRouter());
	router.use("/order", OrderRouter());
	router.use("/review", ReviewRouter());

	return router;
};
