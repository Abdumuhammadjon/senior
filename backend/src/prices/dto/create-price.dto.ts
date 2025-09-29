import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePriceDto {
  @IsString()
  @IsNotEmpty()
  product: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  unit: string;

  @IsString()
  currency: string;

  @IsNumber()
  price: number;
}
