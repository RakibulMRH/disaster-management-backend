import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateDonationDto {
  @IsString()
  @IsNotEmpty()
  donorName: string;

  @IsNumber()
  @Min(1)
  amount: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsNumber()
  crisisId: number;  
}
