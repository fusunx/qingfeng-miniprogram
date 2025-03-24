import { GoodService } from "src/shared/services/good.service";
import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { Public } from "src/shared/decorators/public.decorator";
import { GetGoodListDto } from "src/shared/dtos/good";
import { BasicResult } from "src/shared/vo/basic-result.vo";

@Controller("good")
export class GoodController {
  constructor(private readonly goodService: GoodService) {}

  @Get("list")
  @Public()
  async getGoodList(@Query() dto: GetGoodListDto) {
    const result = await this.goodService.getGoodList(dto);
    return BasicResult.success("获取成功", result);
  }

  @Get("/:id")
  @Public()
  async getGoodDetail(@Param("id", ParseIntPipe) id: number) {
    const result = await this.goodService.getGoodDetail(id);
    return BasicResult.success("获取成功", result);
  }
}
