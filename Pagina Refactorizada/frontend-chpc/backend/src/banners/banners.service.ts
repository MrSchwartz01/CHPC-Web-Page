import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Banner } from '@prisma/client';

@Injectable()
export class BannersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Obtiene todos los banners con información del producto relacionado
   */
  async findAll(): Promise<Banner[]> {
    return await this.prisma.banner.findMany({
      include: {
        producto: {
          select: {
            id: true,
            nombre_producto: true,
            precio: true,
            stock: true,
          },
        },
      },
    });
  }
}
