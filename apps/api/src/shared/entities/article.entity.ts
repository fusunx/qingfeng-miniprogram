import { Entity, Column } from "typeorm";
import { BasicEntity } from "./basic.entity";

@Entity("article")
export class Article extends BasicEntity {
  // 标题：使用 varchar(255)，适合大多数标题场景
  @Column({ type: "varchar", length: 255, comment: "文章标题" })
  title: string;

  // 内容：存储富文本，故选择 longtext 来容纳大段文本
  @Column({ type: "longtext", comment: "富文本内容" })
  content: string;
}
