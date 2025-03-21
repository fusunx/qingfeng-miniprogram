import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ConfigurationService } from "./services/configuration.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "./services/user.service";
import { UtilityService } from "./services/utility.service";
import { AuthService } from "./services/auth.service";
import { User } from "./entities/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./guards/auth-guard.guard";
import { PassportModule } from "@nestjs/passport";
import { AuthLocalStrategy } from "./strategies/auth-local.strategy";

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
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: "7d" },
    }),
  ],
  providers: [
    AuthLocalStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    ConfigurationService,
    UserService,
    UtilityService,
    AuthService,
    User,
  ],
  exports: [
    AuthLocalStrategy,
    ConfigurationService,
    UserService,
    UtilityService,
    AuthService,
    User,
  ],
})
export class SharedModule {}
