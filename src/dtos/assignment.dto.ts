// src/dtos/assignment.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsNumber, Min, IsInt } from 'class-validator';

 export class CreateAssignmentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsString()
  location: string;

  @IsInt()
  @Min(1)
  requiredVolunteers: number;
} 

export class AssignVolunteerDto {
  @IsInt()
  userId!: number;

  @IsInt()
  assignmentId!: number;
}


export class UpdateAssignmentDto {
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
  @IsInt()
  @Min(1)
  requiredVolunteers?: number;
}
  