import { Module } from "@nestjs/common";
import { ArticleController } from './controllers/article.controller';
import { GoodController } from './controllers/good.controller';
import { CategoryController } from './controllers/category.controller';
import { PageController } from './controllers/page.controller';

@Module({
  controllers: [ArticleController, GoodController, CategoryController, PageController],
})
export class ApiModule {}
