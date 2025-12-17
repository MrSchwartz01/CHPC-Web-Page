import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Product } from '@prisma/client';
import { FilterProductsDto } from './dto/filter-products.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters: FilterProductsDto): Promise<Product[]> {
    const { minPrice, maxPrice, marca, color, search } = filters;

    const where: Prisma.ProductWhereInput = {};

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.precio = {};
      if (minPrice !== undefined) {
        where.precio.gte = minPrice;
      }
      if (maxPrice !== undefined) {
        where.precio.lte = maxPrice;
      }
    }

    if (marca) {
      where.marca = {
        contains: marca,
      };
    }

    if (color) {
      where.color = {
        contains: color,
      };
    }

    if (search) {
      where.OR = [
        {
          nombre_producto: {
            contains: search,
          },
        },
        {
          descripcion: {
            contains: search,
          },
        },
        {
          marca: {
            contains: search,
          },
        },
      ];
    }

    return await this.prisma.product.findMany({ where });
  }
}
