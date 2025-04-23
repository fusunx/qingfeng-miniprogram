import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class SetPageConfigDto {
  @IsNotEmpty()
  @IsArray()
  homeFirstImg: string[];
  @IsNotEmpty()
  @IsString()
  homeSecondImg: string;
  @IsNotEmpty()
  @IsString()
  homeVideo: string;
  @IsNotEmpty()
  @IsString()
  experienceTopImg: string;
  @IsNotEmpty()
  @IsString()
  policyTopImg: string;
  @IsNotEmpty()
  @IsString()
  customerServiceWechatQrCode: string;
  @IsNotEmpty()
  @IsString()
  policyTopDetailImg: string;
}
