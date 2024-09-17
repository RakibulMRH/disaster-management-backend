// src/dtos/inventoryItem.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export class CreateInventoryItemDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsEnum(['Relief', 'Expense'])
  type!: 'Relief' | 'Expense';

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateInventoryItemDto {
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsString()
    @IsEnum(['Relief', 'Expense'])
    type?: 'Relief' | 'Expense';
  
    @IsOptional()
    @IsString()
    description?: string;
  }
  