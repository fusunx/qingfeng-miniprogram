import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class UtilityService {
  // hash 密码
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // 设置加盐轮数为 10
    return bcrypt.hash(password, saltRounds);
  }
  // 比较密码和hash值
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
