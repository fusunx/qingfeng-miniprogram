// product.entity.ts
import { Entity, Column, ManyToOne, JoinTable } from "typeorm";
import { Category } from "./category.entity";
import { IsNotEmpty } from "class-validator";
import { BasicEntity } from "./basic.entity";
import { IGoodMapDataList } from "@qinfeng/types";

@Entity("good")
export class Good extends BasicEntity {
  /** 列表图片 */
  @Column()
  listImg: string;

  /** 商品轮播图数组,存储静态地址，为字符串数组 */
  @Column({ type: "json", nullable: true, comment: "商品轮播图数组" })
  swiperImgs: string[]; // 在应用端可直接当作 string[] 操作

  /** 商品详情图片 */
  @Column()
  detailImg: string;

  /** 商品详情，表格形式，存储数据为 key: value */
  @Column({ type: "json", nullable: true, comment: "商品详情数据数组" })
  detailTable: IGoodMapDataList;

  /** 销量 */
  @Column({ default: 0 })
  sales: number;

  /** 商品价格 */
  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  price: number;

  @ManyToOne(() => Category, (category) => category.products, {
    cascade: true,
  })
  @JoinTable()
  @IsNotEmpty()
  category: Category[];
}
