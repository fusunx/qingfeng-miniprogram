import { ArticleService } from "src/shared/services/article.service";
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";
import {
  GetArticleListDto,
  CreateArticleDto,
  UpdateArticleDto,
} from "src/shared/dtos/article";
import { BasicResult } from "src/shared/vo/basic-result.vo";

@Controller("article")
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get("list")
  async getArticleList(@Query() getArticleListDto: GetArticleListDto) {
    const result = await this.articleService.getArticleList(getArticleListDto);
    return BasicResult.success("获取成功", result);
  }

  @Get("/:id")
  async getArticleById(@Param("id", ParseIntPipe) id: number) {
    const result = await this.articleService.getArticleDetail(id);
    return BasicResult.success("获取成功", result);
  }

  @Post("create")
  async createArticle(@Body() createArticleDto: CreateArticleDto) {
    const result = await this.articleService.createArticle(createArticleDto);
    return BasicResult.success("创建成功", result);
  }

  @Post("update/:id")
  async updateArticle(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    const result = await this.articleService.updateArticle(
      id,
      updateArticleDto,
    );
    return BasicResult.success("更新成功", result);
  }
}
