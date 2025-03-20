import { Entity, Column } from "typeorm";
import { BasicEntity } from "./basic.entity";
import { Exclude } from "class-transformer";

@Entity("article")
export class User extends BasicEntity {
  @Column({ length: 50, unique: true })
  username: string;

  @Column()
  @Exclude() // class-transformer序列化中排除
  password: string;
}
