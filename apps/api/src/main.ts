import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 添加全局中间件
  app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
  });

  // 配置class-validate
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 删除 DTO 中未定义的字段
      transform: true, // 自动转换 DTO 中的字段类型
      // forbidNonWhitelisted: true, // 如果有多余字段，直接抛出错误
    }),
  );

  // 设置全局路由前缀
  // app.setGlobalPrefix("api");

  await app.listen(process.env.PORT ?? 4000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
