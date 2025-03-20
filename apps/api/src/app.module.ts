import { Module } from "@nestjs/common";
import { SharedModule } from "./shared/shared.module";
import { AdminModule } from "./admin/admin.module";
import { ApiModule } from "./api/api.module";

@Module({
  imports: [SharedModule, AdminModule, ApiModule],
})
export class AppModule {}
