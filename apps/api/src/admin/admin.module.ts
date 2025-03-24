import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/auth.controller";
import { PageController } from './controllers/page.controller';
import { CategoryController } from './controllers/category.controller';
import { GoodController } from './controllers/good.controller';
import { ArticleController } from './controllers/article.controller';

@Module({
  controllers: [AuthController, PageController, CategoryController, GoodController, ArticleController],
})
export class AdminModule {}
