import { Module } from "@nestjs/common";
import { SharedModule } from "./shared/shared.module";
import { AdminModule } from "./admin/admin.module";
import { ApiModule } from "./api/api.module";
import { RouterModule } from "@nestjs/core";
import { CommonModule } from "./common/common.module";

@Module({
  imports: [
    SharedModule,
    AdminModule,
    ApiModule,
    RouterModule.register([
      {
        path: "api/admin", // 设置统一前缀 `/api`
        module: AdminModule,
      },
      {
        path: "api", // 同样设置 `/api` 前缀给另一个模块
        module: ApiModule,
      },
      {
        path: "api/admin", // 同样设置 `/api` 前缀给另一个模块
        module: CommonModule,
      },
    ]),
  ],
})
export class AppModule {}
