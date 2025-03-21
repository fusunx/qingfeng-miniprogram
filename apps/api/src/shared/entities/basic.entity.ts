import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { EntityCommonStatus } from "@qinfeng/types";

export class BasicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /** 排序字段,越大越靠前 */
  @Column({ default: 100 })
  sort: number;

  @Column({
    type: "enum",
    enum: EntityCommonStatus,
    default: EntityCommonStatus.enable,
  })
  status: EntityCommonStatus; // 是否生效 0 表示无效 1表示有效

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;
}
