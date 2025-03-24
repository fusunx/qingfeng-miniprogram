import { GoodService } from "src/shared/services/good.service";
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
  GetGoodListDto,
  CreateGoodDto,
  UpdateGoodDto,
} from "src/shared/dtos/good";
import { BasicResult } from "src/shared/vo/basic-result.vo";

@Controller("good")
export class GoodController {
  constructor(private readonly goodService: GoodService) {}

  @Get("list")
  async getGoodList(@Query() getGoodListDto: GetGoodListDto) {
    const result = await this.goodService.getGoodList(getGoodListDto);
    return BasicResult.success("获取成功", result);
  }

  @Get("/:id")
  async getGoodById(@Param("id", ParseIntPipe) id: number) {
    const result = await this.goodService.getGoodDetail(id);
    return BasicResult.success("获取成功", result);
  }

  @Post("create")
  async createGood(@Body() createGoodDto: CreateGoodDto) {
    const result = await this.goodService.createGood(createGoodDto);
    return BasicResult.success("创建成功", result);
  }

  @Post("update/:id")
  async updateGood(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateGoodDto: UpdateGoodDto,
  ) {
    const result = await this.goodService.updateGood(id, updateGoodDto);
    return BasicResult.success("更新成功", result);
  }
}
