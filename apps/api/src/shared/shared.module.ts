import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ConfigurationService } from "./services/configuration.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigurationService],
      useFactory: (configurationService: ConfigurationService) => {
        return {
          type: "mysql", // 连接数据库的类型
          ...configurationService.mysqlConfig,
          timezone: "+08:00", // 设置时区
          autoLoadEntities: true, // 自动加载所有的实体，一个实体对应一张表
          synchronize: configurationService.synchronize, // 是否自动同步数据库和实体的表结构， 开发时为true，生产环境为false
          logging: false, // 打印真正的sql语句
          // 配置迁移
          migrations: [__dirname + "/migrations/*{.ts,.js}"], // 迁移文件路径
          migrationsRun: false, // 是否自动运行迁移（生产环境建议为false）

          // 配置 CLI 路径（用于生成迁移）
          cli: {
            migrationsDir: "src/migrations",
          },
        };
      },
    }),
    TypeOrmModule.forFeature([]),
  ],
  providers: [ConfigurationService],
  exports: [ConfigurationService],
})
export class SharedModule {}
