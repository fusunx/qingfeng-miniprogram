/** 页面配置 */
import { Entity, Column } from "typeorm";
import { BasicEntity } from "./basic.entity";

@Entity("article")
export class Page extends BasicEntity {
  /** ==================首页配置开始================== */
  // 顶部第一张图片
  @Column()
  firstImg: string;
  // 顶部第二张图片
  @Column()
  secondImg: string;
  // 顶部视频
  @Column()
  video: string;

  /** ==================首页配置结束================== */

  /** ==================生活馆页配置开始================== */
  // 顶部图片
  @Column()
  experienceTopImg: string;
  /** ==================生活馆页配置结束================== */

  /** ==================政策页配置开始================== */
  // 顶部图片
  @Column()
  policyTopImg: string;
  /** ==================政策馆页配置结束================== */
}
