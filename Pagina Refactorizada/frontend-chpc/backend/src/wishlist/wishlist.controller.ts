import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistItemDto } from './dto/create-wishlist-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';

interface AuthRequest extends ExpressRequest {
  user: {
    userId: number;
    username: string;
    rol: string;
  };
}

@UseGuards(JwtAuthGuard)
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  async addItem(
    @Request() req: AuthRequest,
    @Body() dto: CreateWishlistItemDto,
  ) {
    return this.wishlistService.addItem(req.user.userId, dto);
  }

  @Get()
  async findMyWishlist(@Request() req: AuthRequest) {
    return this.wishlistService.findUserWishlist(req.user.userId);
  }

  @Delete(':productId')
  async removeItem(
    @Request() req: AuthRequest,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.wishlistService.removeItem(req.user.userId, productId);
  }
}
