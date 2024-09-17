// src/dtos/inventoryTransaction.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsNumber, Min } from 'class-validator';

export class CreateInventoryTransactionDto {
  @IsNumber()
  @Min(1)
  itemId!: number;

  @IsString()
  @IsEnum(['donation', 'purchase', 'distribution'])
  transactionType!: 'donation' | 'purchase' | 'distribution';

  @IsNumber()
  @Min(1)
  quantity!: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  unitPrice?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
