import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

// 加载 .env 文件
dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.MYSQL_HOST, // 从环境变量中获取配置
  port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  timezone: "+08:00",
  synchronize: true, // 禁用同步以使用迁移
  logging: false,
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/migrations/*{.ts,.js}"],
});
