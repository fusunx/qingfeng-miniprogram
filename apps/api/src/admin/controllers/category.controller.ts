import { CategoryService } from "src/shared/services/category.service";
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
  CreateCategoryDto,
  GetCategoryListDto,
  UpdateCategoryDto,
} from "src/shared/dtos/category.dto";
import { BasicResult } from "src/shared/vo/basic-result.vo";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get("list")
  async getCategoryList(@Query() getCategoryListDto: GetCategoryListDto) {
    const result =
      await this.categoryService.getCategoryList(getCategoryListDto);
    return BasicResult.success("获取成功", result);
  }

  @Get("/:id")
  async getCategoryById(@Param("id", ParseIntPipe) id: number) {
    const result = await this.categoryService.getCategoryDetail(id);
    return BasicResult.success("获取成功", result);
  }

  @Post("create")
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    const result = await this.categoryService.createCategory(createCategoryDto);
    return BasicResult.success("创建成功", result);
  }

  @Post("update/:id")
  async updateCategory(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const result = await this.categoryService.updateCategory(
      id,
      updateCategoryDto,
    );
    return BasicResult.success("更新成功", result);
  }
}
