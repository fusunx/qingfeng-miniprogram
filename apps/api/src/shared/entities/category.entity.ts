// category.entity.ts
import { Entity, Column, OneToMany } from "typeorm";
import { BasicEntity } from "./basic.entity";
import { Good } from "./good.entity";

@Entity("category")
export class Category extends BasicEntity {
  @Column({ nullable: true })
  img: string;

  @OneToMany(() => Good, (good) => good.category)
  products: Good[];
}
