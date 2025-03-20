import { IsNumber, IsOptional, IsString } from "class-validator";

export class LoginDto {
  @IsOptional()
  @IsNumber()
  id: number;
  @IsString()
  username: string;
  @IsString()
  password: string;
}
