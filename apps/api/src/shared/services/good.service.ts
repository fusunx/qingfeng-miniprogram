import { CategoryService } from "./category.service";
import { Injectable } from "@nestjs/common";
import { MysqlBaseService } from "./mysql-basic.service";
import { Good } from "../entities/good.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateGoodDto, GetGoodListDto, UpdateGoodDto } from "../dtos/good";

@Injectable()
export class GoodService extends MysqlBaseService<Good> {
  constructor(
    @InjectRepository(Good) protected repository: Repository<Good>,
    private readonly categoryService: CategoryService,
  ) {
    super(repository);
  }

  async initCategory(id: number) {
    const category = await this.categoryService.findOne({
      where: { id },
    });
    if (!category) {
      throw new Error("分类不存在");
    }
    return category;
  }

  /** 创建商品 */
  async createGood(createGoodDto: CreateGoodDto) {
    const category = await this.initCategory(createGoodDto.category);
    // 保存商品
    return await this.repository.save({ ...createGoodDto, category });
  }

  /** 获取商品列表 */
  async getGoodList(getGoodListDto: GetGoodListDto) {
    const { page, pageSize, id, name, categoryId, status } = getGoodListDto;
    const queryBuilder = this.repository
      .createQueryBuilder("good")
      .leftJoinAndSelect("good.category", "category")
      .addOrderBy("good.createdAt", "DESC") // 按创建时间降序排序
      .skip((page - 1) * pageSize)
      .take(pageSize);

    if (name) {
      queryBuilder.andWhere("good.name like :name", {
        name: `%${name}%`,
      });
    }

    if (id) {
      queryBuilder.andWhere("good.id = :id", {
        id: id,
      });
    }

    if (categoryId) {
      queryBuilder.andWhere("category.id = :categoryId", {
        categoryId: categoryId,
      });
    }

    if (status !== undefined) {
      queryBuilder.andWhere("good.status = :status", {
        status: status,
      });
    }

    const [data = [], total] = await queryBuilder.getManyAndCount();
    return {
      data,
      total,
    };
  }

  /** 获取商品详情 */
  async getGoodDetail(id: number) {
    return await this.repository.findOne({
      where: { id },
      relations: ["category"],
    });
  }
  /** 更新商品 */
  async updateGood(id: number, updateGoodDto: UpdateGoodDto) {
    const category = await this.initCategory(updateGoodDto.category);
    return await this.repository.update(id, { ...updateGoodDto, category });
  }
}
