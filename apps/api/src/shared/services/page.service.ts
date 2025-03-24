import { Injectable } from "@nestjs/common";
import { SetPageConfigDto } from "../dtos/page.dto";
import { Page } from "../entities/page.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page)
    private readonly pageRepository: Repository<Page>,
  ) {}

  /** 设置页面配置 */
  async setPageConfig(setPageConfigDto: SetPageConfigDto) {
    const page = await this.pageRepository.findOneBy({ id: 1 });
    // 如果存在就更新，否则就创建
    if (page) {
      return await this.pageRepository.update(1, {
        pageConfig: setPageConfigDto,
      });
    } else {
      return await this.pageRepository.save({
        pageConfig: setPageConfigDto,
      });
    }
  }

  /** 获取页面配置 */
  async getPageConfig() {
    const page = await this.pageRepository.findOneBy({ id: 1 });
    if (page) {
      return page.pageConfig;
    } else {
      return {};
    }
  }
}
