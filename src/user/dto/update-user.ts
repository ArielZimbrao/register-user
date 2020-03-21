import { IsString, IsNumber, IsBoolean, IsOptional } from "class-validator";

export class UpdateUser {
  @IsNumber()
  id: Number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsBoolean()
  enable: boolean;
} 