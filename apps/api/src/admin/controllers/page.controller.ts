import { PageService } from "src/shared/services/page.service";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { SetPageConfigDto } from "src/shared/dtos/page.dto";
import { BasicResult } from "src/shared/vo/basic-result.vo";

@Controller("page")
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post("config/set")
  async setPageConfig(@Body() setPageConfigDto: SetPageConfigDto) {
    const result = await this.pageService.setPageConfig(setPageConfigDto);
    return BasicResult.success("设置成功", result);
  }

  @Get("config/get")
  async getPageConfig() {
    const result = await this.pageService.getPageConfig();
    return BasicResult.success("获取成功", result);
  }
}
