// src/dtos/crisis.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export class CreateCrisisDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsString()
  @IsEnum(['low', 'medium', 'high', 'critical'])
  severity!: 'low' | 'medium' | 'high' | 'critical';

  @IsOptional()
  @IsString()
  requiredHelp?: string;
 
  @IsString()
  goal: number;
}

export class UpdateCrisisDto {
    @IsOptional()
    @IsString()
    title?: string;
  
    @IsOptional()
    @IsString()
    description?: string;
  
    @IsOptional()
    @IsString()
    location?: string;
  
    @IsOptional()
    @IsString()
    imageUrl?: string;
  
    @IsOptional()
    @IsString()
    @IsEnum(['low', 'medium', 'high', 'critical'])
    severity?: 'low' | 'medium' | 'high' | 'critical';
  
    @IsOptional()
    @IsString()
    requiredHelp?: string;
  
    @IsOptional()
    @IsString()
    @IsEnum(['pending', 'approved', 'resolved', 'rejected'])
    status?: 'pending' | 'approved' | 'resolved' | 'rejected';

    @IsOptional()
    @IsString()
    goal: number;
  }
  