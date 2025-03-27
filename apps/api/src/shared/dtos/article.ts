import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { GetListCommonDto } from "./category.dto";

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

/** 获取文章列表dto */
export class GetArticleListDto extends GetListCommonDto {}
