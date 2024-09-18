// src/dtos/expense.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsDecimal, Min } from 'class-validator';

export class CreateExpenseDto {
  @IsDecimal()
  @Min(0.01)
  amount!: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
