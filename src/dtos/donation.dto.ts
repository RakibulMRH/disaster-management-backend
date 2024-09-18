import { IsString, IsNotEmpty, IsOptional, IsDecimal, Min } from 'class-validator';

export class CreateDonationDto {
  @IsOptional()
  @IsString()
  donorName?: string;

  @IsDecimal()
  @Min(10)
  amount!: number; // Use the definite assignment assertion

  @IsOptional()
  @IsString()
  notes?: string;
}