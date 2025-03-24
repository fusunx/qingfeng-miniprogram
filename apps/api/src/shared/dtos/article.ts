import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

/** 创建文章dto */
export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  content: string;
  @IsNotEmpty()
  @IsString()
  img: string;
  @IsNotEmpty()
  @IsString()
  name: string;
}

/** 更新文章dto */
export class UpdateArticleDto extends CreateArticleDto {
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

/** 获取文章列表dto */
export class GetArticleListDto extends GetListCommonDto {}
