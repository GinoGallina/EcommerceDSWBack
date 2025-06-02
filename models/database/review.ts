import { Entity, Column, JoinColumn, ManyToOne } from "typeorm";
import { BaseModel } from "./BaseModel";
import { Product } from "./Product";
import { User } from "./User";

@Entity("Review")
export class Review extends BaseModel {
	@Column({ type: "varchar", length: 350 })
	Description!: string;

	@Column({ type: "int" })
	Rate!: number;

	@Column({ type: "int" })
	ProductId!: number;

	@Column({ type: "int" })
	UserId!: number;

	@ManyToOne(() => Product, (product) => product.Reviews)
	@JoinColumn({ name: "ProductId" })
	Product!: Product;

	@ManyToOne(() => User, (user) => user.Reviews)
	@JoinColumn({ name: "UserId" })
	User!: User;

	constructor(init?: Partial<Review>) {
		super();
		Object.assign(this, init);
	}
}
