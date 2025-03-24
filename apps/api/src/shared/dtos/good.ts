import { EntityCommonStatus, IGoodMapDataList } from "@qinfeng/types";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

/** 创建分类dto */
export class CreateGoodDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  description?: string;
  @IsOptional()
  @IsString()
  img?: string;
  @IsNotEmpty()
  @IsString()
  listImg: string;
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => JSON.stringify(value)) // 类型转换
  swiperImgs: string[];
  @IsNotEmpty()
  @IsString()
  detailImg: string;
  @IsOptional()
  @IsString()
  @Transform(({ value }) => JSON.stringify(value)) // 类型转换
  detailTable: IGoodMapDataList;
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  sales: number;
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  price: number;
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  category: number;
  @IsNotEmpty()
  @IsNumber()
  status: EntityCommonStatus;
}

/** 更新分类dto */
export class UpdateGoodDto extends CreateGoodDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

/** 获取列表通用dto */
export class GetListCommonDto {
  @Transform(({ value }) => Number(value)) // 类型转换
  @IsNumber()
  page: number;
  @Transform(({ value }) => Number(value)) // 类型转换
  @IsNumber()
  pageSize: number;
  @IsOptional()
  @IsNumber()
  id?: number;
  @IsOptional()
  @IsString()
  name?: string;
}

/** 获取分类列表dto */
export class GetGoodListDto extends GetListCommonDto {
  @IsOptional()
  @IsNumber()
  categoryId?: number;
}
