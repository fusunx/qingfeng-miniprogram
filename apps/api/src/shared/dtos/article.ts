import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { GetListCommonDto } from "./category.dto";
import { EntityCommonStatus } from "@qinfeng/types";

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
  @IsOptional()
  @IsNumber()
  status: EntityCommonStatus;
}

/** 更新文章dto */
export class UpdateArticleDto extends CreateArticleDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

/** 获取文章列表dto */
export class GetArticleListDto extends GetListCommonDto {}
