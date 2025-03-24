import { ArticleService } from "src/shared/services/article.service";
import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { Public } from "src/shared/decorators/public.decorator";
import { GetListCommonDto } from "src/shared/dtos/category.dto";
import { BasicResult } from "src/shared/vo/basic-result.vo";

@Controller("article")
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get("list")
  @Public()
  async getArticleList(@Query() dto: GetListCommonDto) {
    const result = await this.articleService.getArticleList(dto);
    return BasicResult.success("获取成功", result);
  }

  @Get("/:id")
  @Public()
  async getArticleDetail(@Param("id", ParseIntPipe) id: number) {
    const result = await this.articleService.getArticleDetail(id);
    return BasicResult.success("获取成功", result);
  }
}
