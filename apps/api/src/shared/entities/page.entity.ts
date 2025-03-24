/** 页面配置 */
import { Entity, Column } from "typeorm";
import { BasicEntity } from "./basic.entity";
import { IPageConfig } from "@qinfeng/types";

@Entity("pageConfig")
export class Page extends BasicEntity {
  @Column("json")
  pageConfig: IPageConfig;
}
