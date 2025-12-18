import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterProductsDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPrice?: number;

  @IsOptional()
  @IsString()
  marca?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  search?: string;

  // Rangos predefinidos de precio:
  //  - "low":   menor a 100
  //  - "mid":   de 101 a 399
  //  - "high":  desde 400 en adelante
  @IsOptional()
  @IsIn(['low', 'mid', 'high'])
  priceRange?: 'low' | 'mid' | 'high';
}
