import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 配置class-validate
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 删除 DTO 中未定义的字段
      // forbidNonWhitelisted: true, // 如果有多余字段，直接抛出错误
    }),
  );

  // 设置全局路由前缀
  app.setGlobalPrefix("api");

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
