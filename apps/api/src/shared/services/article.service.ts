import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MysqlBaseService } from "./mysql-basic.service";
import { Article } from "../entities/article.entity";
import {
  CreateArticleDto,
  GetArticleListDto,
  UpdateArticleDto,
} from "../dtos/article";

@Injectable()
export class ArticleService extends MysqlBaseService<Article> {
  constructor(
    @InjectRepository(Article) protected repository: Repository<Article>,
  ) {
    super(repository);
  }

  /** 创建文章 */
  async createArticle(createArticleDto: CreateArticleDto) {
    return await this.repository.save(createArticleDto);
  }

  /** 获取文章列表 */
  async getArticleList(getArticleListDto: GetArticleListDto) {
    const { page, pageSize, id, name } = getArticleListDto;
    const queryBuilder = this.repository
      .createQueryBuilder("category")
      .addOrderBy("category.createdAt", "DESC") // 按创建时间降序排序
      .skip((page - 1) * pageSize)
      .take(pageSize);

    if (name) {
      queryBuilder.andWhere("category.name like :name", {
        name: `%${name}%`,
      });
    }

    if (id) {
      queryBuilder.andWhere("category.id = :id", {
        id: id,
      });
    }

    const [data = [], total] = await queryBuilder.getManyAndCount();
    return {
      data,
      total,
    };
  }

  /** 获取文章详情 */
  async getArticleDetail(id: number) {
    return await this.repository.findOneBy({ id });
  }
  /** 更新文章 */
  async updateArticle(id: number, updateArticleDto: UpdateArticleDto) {
    return await this.repository.update(id, updateArticleDto);
  }
}
