import { Entity, Column, OneToMany } from "typeorm";
import { BaseModel } from "./BaseModel";
import { Product } from "./Product";

@Entity("Category")
export class Category extends BaseModel {
	@Column({ type: "varchar", unique: true })
	Name!: string;

	@OneToMany(() => Product, (product) => product.Category)
	Products?: Product[];

	constructor(init?: Partial<Category>) {
		super();
		Object.assign(this, init);
	}
}
