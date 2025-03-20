import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { MysqlBaseService } from "./mysql-basic.service";

@Injectable()
export class UserService extends MysqlBaseService<User> {
  constructor(@InjectRepository(User) protected repository: Repository<User>) {
    super(repository);
  }
}
