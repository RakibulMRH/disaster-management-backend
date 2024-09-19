import { IsString, IsNotEmpty, IsOptional, IsDecimal, Min, IsInt } from 'class-validator';

export class CreateExpenseDto {
  @IsDecimal()
  @Min(0.01)
  amount!: number;  // The cost of the purchase

  @IsOptional()
  @IsInt()
  itemId?: number;  // Link to the inventory item (if applicable)

  @IsOptional()
  @IsInt()
  userId?: number;  // The ID of the user making the purchase or logging the expense

  @IsOptional()
  @IsString()
  description?: string;  // A description for the expense

  @IsOptional()
  @IsString()
  notes?: string;  // Any additional notes
}
