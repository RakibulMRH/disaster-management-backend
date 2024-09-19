import { IsString, IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class InventoryTransactionDto {
  @IsInt()
  @IsNotEmpty()
  itemId: number;

  @IsString()
  @IsNotEmpty()
  transactionType: string; // 'add', 'remove', 'purchase'

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsOptional()
  @IsNumber()
  cost?: number; // Only for purchases

  @IsOptional()
  @IsString()
  notes?: string;
}
