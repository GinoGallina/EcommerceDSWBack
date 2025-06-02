import { container } from "tsyringe";
import { db } from "./database";
import { ProductRepository } from "../repository/ProductRepository";
import { UserService } from "../services/UserService";
import { CategoryService } from "../services/CategoryService";
import { Product } from "../models/database/Product";
import { ProductService } from "../services/ProductService";
import { ProductController } from "../controllers/ProductController";
import { Category } from "../models/database/Category";
import { CategoryRepository } from "../repository/CategoryRepository";
import { User } from "../models/database/User";
import { Role } from "../models/database/Role";
import { UserRepository } from "../repository/UserRepository";
import { UserController } from "../controllers/UserController";
import { CategoryController } from "../controllers/CategoryController";
import { AuthService } from "../services/AuthService";
import { AuthController } from "../controllers/AuthController";
import { RoleController } from "../controllers/RoleController";
import { RoleService } from "../services/RoleService";
import { RoleRepository } from "../repository/RoleRepository";
import { PaymentTypeController } from "../controllers/PaymentTypeController";
import { PaymentTypeService } from "../services/PaymentTypeService";
import { PaymentTypeRepository } from "../repository/PaymentTypeRepository";
import { PaymentType } from "../models/database/PaymentType";
import { Order } from "../models/database/Order";
import { OrderRepository } from "../repository/OrderRepository";
import { OrderService } from "../services/OrderService";
import { OrderController } from "../controllers/OrderController";
import { ReviewController } from "../controllers/ReviewController";
import { ReviewService } from "../services/ReviewService";
import { ReviewRepository } from "../repository/ReviewRepository";
import { Review } from "../models/database/Review";

export const registerInyectables = () => {
	// Database
	container.register("DataSource", { useValue: db });

	// TypeORM repositories
	container.register("ProductTypeORMRepository", {
		useValue: db.getRepository(Product),
	});
	container.register("CategoryTypeORMRepository", {
		useValue: db.getRepository(Category),
	});
	container.register("UserTypeORMRepository", {
		useValue: db.getRepository(User),
	});
	container.register("RoleTypeORMRepository", {
		useValue: db.getRepository(Role),
	});
	container.register("PaymentTypeTypeORMRepository", {
		useValue: db.getRepository(PaymentType),
	});
	container.register("OrderTypeORMRepository", {
		useValue: db.getRepository(Order),
	});
	container.register("ReviewTypeORMRepository", {
		useValue: db.getRepository(Review),
	});

	// Repositories
	container.register("ProductRepository", { useClass: ProductRepository });
	container.register("CategoryRepository", { useClass: CategoryRepository });
	container.register("UserRepository", { useClass: UserRepository });
	container.register("RoleRepository", { useClass: RoleRepository });
	container.register("PaymentTypeRepository", { useClass: PaymentTypeRepository });
	container.register("OrderRepository", { useClass: OrderRepository });
	container.register("ReviewRepository", { useClass: ReviewRepository });

	// Services
	container.register("CategoryService", { useClass: CategoryService });
	container.register("ProductService", { useClass: ProductService });
	container.register("UserService", { useClass: UserService });
	container.register("AuthService", { useClass: AuthService });
	container.register("RoleService", { useClass: RoleService });
	container.register("PaymentTypeService", { useClass: PaymentTypeService });
	container.register("OrderService", { useClass: OrderService });
	container.register("ReviewService", { useClass: ReviewService });

	// Controllers
	container.register("ProductController", { useClass: ProductController });
	container.register("CategoryController", { useClass: CategoryController });
	container.register("UserController", { useClass: UserController });
	container.register("AuthController", { useClass: AuthController });
	container.register("RoleController", { useClass: RoleController });
	container.register("PaymentTypeController", { useClass: PaymentTypeController });
	container.register("OrderController", { useClass: OrderController });
	container.register("ReviewController", { useClass: ReviewController });
};
