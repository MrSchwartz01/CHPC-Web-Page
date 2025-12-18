import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWishlistItemDto } from './dto/create-wishlist-item.dto';

@Injectable()
export class WishlistService {
  constructor(private readonly prisma: PrismaService) {}

  async addItem(userId: number, dto: CreateWishlistItemDto) {
    // Verificar que el producto exista
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    try {
      const item = await this.prisma.wishlistItem.create({
        data: {
          userId,
          productId: dto.productId,
        },
        include: {
          product: true,
        },
      });
      return item;
    } catch (error: any) {
      // Violación de la restricción única (ya estaba en wishlist)
      if (error.code === 'P2002') {
        throw new ConflictException('El producto ya está en la lista de deseos');
      }
      throw error;
    }
  }

  async findUserWishlist(userId: number) {
    return this.prisma.wishlistItem.findMany({
      where: { userId },
      include: {
        product: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async removeItem(userId: number, productId: number) {
    // Usamos la clave compuesta userId + productId
    try {
      const deleted = await this.prisma.wishlistItem.delete({
        where: {
          user_product_unique: {
            userId,
            productId,
          },
        },
      });
      return deleted;
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException('El producto no está en la lista de deseos');
      }
      throw error;
    }
  }
}
