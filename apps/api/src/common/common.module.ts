import { Module } from "@nestjs/common";
import { UploadController } from "./controllers/upload.controller";
import { join } from "path";
import { ServeStaticModule } from "@nestjs/serve-static";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../..", "uploads"),
      serveRoot: "/uploads",
    }),
  ],
  controllers: [UploadController],
  providers: [],
})
export class CommonModule {}
