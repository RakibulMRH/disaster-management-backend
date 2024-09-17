// src/dtos/assignment.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsNumber, Min } from 'class-validator';

export class CreateAssignmentDto {
  @IsNumber()
  @Min(1)
  volunteerId!: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  crisisId?: number;

  @IsOptional()
  @IsString()
  taskDescription?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsString()
  @IsEnum(['assigned', 'in_progress', 'completed'])
  status!: 'assigned' | 'in_progress' | 'completed';
}

export class UpdateAssignmentDto {
    @IsOptional()
    @IsNumber()
    @Min(1)
    volunteerId?: number;
  
    @IsOptional()
    @IsNumber()
    @Min(1)
    crisisId?: number;
  
    @IsOptional()
    @IsString()
    taskDescription?: string;
  
    @IsOptional()
    @IsString()
    location?: string;
  
    @IsOptional()
    @IsString()
    @IsEnum(['assigned', 'in_progress', 'completed'])
    status?: 'assigned' | 'in_progress' | 'completed';
  }
  