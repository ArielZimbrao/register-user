import { IsString } from "class-validator";

export class CreateUser {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  password: string;
} 