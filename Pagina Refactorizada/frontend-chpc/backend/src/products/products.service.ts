import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Product } from '@prisma/client';
import { FilterProductsDto } from './dto/filter-products.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  async findAll(filters: FilterProductsDto): Promise<Product[]> {
    const { minPrice, maxPrice, marca, color, search, priceRange } = filters;

    const where: Prisma.ProductWhereInput = {};

    // Determinar rango de precio según priceRange o min/max explícitos
    let effectiveMin = minPrice;
    let effectiveMax = maxPrice;

    if (priceRange === 'low') {
      // Menor a 100
      effectiveMin = undefined;
      effectiveMax = 100;
    } else if (priceRange === 'mid') {
      // De 101 a 399
      effectiveMin = 101;
      effectiveMax = 399;
    } else if (priceRange === 'high') {
      // Desde 400 en adelante
      effectiveMin = 400;
      effectiveMax = undefined;
    }

    if (effectiveMin !== undefined || effectiveMax !== undefined) {
      where.precio = {};
      if (effectiveMin !== undefined) {
        where.precio.gte = effectiveMin;
      }
      if (effectiveMax !== undefined) {
        where.precio.lte = effectiveMax;
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
