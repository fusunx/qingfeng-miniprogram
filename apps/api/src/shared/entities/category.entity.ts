// category.entity.ts
import { Entity, Column, OneToMany } from "typeorm";
import { BasicEntity } from "./basic.entity";
import { Product } from "./good.entity";

@Entity()
export class Category extends BasicEntity {
  @Column()
  img: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
