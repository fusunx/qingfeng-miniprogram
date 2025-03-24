import { PageService } from "src/shared/services/page.service";
import { Controller, Get } from "@nestjs/common";
import { BasicResult } from "src/shared/vo/basic-result.vo";
import { Public } from "src/shared/decorators/public.decorator";

@Controller("page")
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Get("get")
  @Public()
  async getPageConfig() {
    const result = await this.pageService.getPageConfig();
    return BasicResult.success("获取成功", result);
  }
}
