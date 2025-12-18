import { IsInt, IsPositive } from 'class-validator';

export class CreateWishlistItemDto {
  @IsInt()
  @IsPositive()
  productId: number;
}
