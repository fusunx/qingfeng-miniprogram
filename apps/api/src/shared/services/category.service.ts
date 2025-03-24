import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/shared/entities/category.entity";
import { MysqlBaseService } from "src/shared/services/mysql-basic.service";
import { Repository } from "typeorm";
import {
  CreateCategoryDto,
  GetCategoryListDto,
  UpdateCategoryDto,
} from "../dtos/category.dto";

@Injectable()
export class CategoryService extends MysqlBaseService<Category> {
  constructor(
    @InjectRepository(Category) protected repository: Repository<Category>,
  ) {
    super(repository);
  }

  /** 创建分类 */
  async createCategory(createCategoryDto: CreateCategoryDto) {
    return await this.repository.save(createCategoryDto);
  }

  /** 获取分类列表 */
  async getCategoryList(getCategoryListDto: GetCategoryListDto) {
    const { page, pageSize, id, name } = getCategoryListDto;
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

  /** 获取分类详情 */
  async getCategoryDetail(id: number) {
    return await this.repository.findOneBy({ id });
  }
  /** 更新分类 */
  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.repository.update(id, updateCategoryDto);
  }
}
