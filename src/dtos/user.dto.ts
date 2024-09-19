// src/dtos/user.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsEmail, IsNumber, Min, Max, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9_]+$/, { message: 'Username can only contain letters, numbers, and underscores.' })
  username!: string;

  @IsString()
  @IsNotEmpty()
  password!: string; // Ensure to hash this password before storing

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(120)
  age?: number;
}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @IsOptional()
    @IsString()
    phoneNumber?: string;
  
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(120)
    age?: number;

    @IsString()
    @IsOptional()
    password?: string;
  }
  
