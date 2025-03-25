import { CategoryService } from "src/shared/services/category.service";
import { Controller, Get, Query } from "@nestjs/common";
import { Public } from "src/shared/decorators/public.decorator";
import { GetCategoryListDto } from "src/shared/dtos/category.dto";
import { BasicResult } from "src/shared/vo/basic-result.vo";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get("list")
  @Public()
  async getCategoryList(@Query() dto: GetCategoryListDto) {
    const result = await this.categoryService.getCategoryList(dto);
    return BasicResult.success("获取成功", result);
  }
}
