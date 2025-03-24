import { Transform, Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

/** 创建分类dto */
export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  description?: string;
  @IsOptional()
  @IsString()
  img?: string;
}

/** 更新分类dto */
export class UpdateCategoryDto extends CreateCategoryDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

/** 获取列表通用dto */
export class GetListCommonDto {
  @Type(() => Number)
  @Transform(({ value }) => Number(value)) // 类型转换
  @IsNumber()
  page: number;
  @Type(() => Number)
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
export class GetCategoryListDto extends GetListCommonDto {}
