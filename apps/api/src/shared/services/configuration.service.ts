import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

/**
 * 获取配置文件
 */
@Injectable()
export class ConfigurationService {
  constructor(private configService: ConfigService) {}

  get mysqlHost(): string {
    return this.configService.get<string>("MYSQL_HOST");
  }
  get mysqlPort(): number {
    return parseInt(this.configService.get<string>("MYSQL_PORT"));
  }
  get mysqlUser(): string {
    return this.configService.get<string>("MYSQL_USER");
  }
  get mysqlPassword(): string {
    return this.configService.get<string>("MYSQL_PASSWORD");
  }
  get mysqlDb(): string {
    return this.configService.get<string>("MYSQL_DB");
  }

  get mysqlConfig() {
    return {
      host: this.mysqlHost,
      port: this.mysqlPort,
      username: this.mysqlUser,
      password: this.mysqlPassword,
      database: this.mysqlDb,
    };
  }

  get synchronize(): boolean {
    return this.configService.get<string>("SYNCHRONIZE") === "true";
  }

  get jwtSecret(): string {
    return this.configService.get<string>("JWT_SECRET");
  }

  get jwtExpirationTime(): string {
    return this.configService.get<string>("JWT_EXPIRATION_TIME");
  }
}
