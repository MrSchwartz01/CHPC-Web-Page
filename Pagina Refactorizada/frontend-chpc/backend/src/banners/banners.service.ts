import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Banner } from '@prisma/client';

@Injectable()
export class BannersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Banner[]> {
    return await this.prisma.banner.findMany();
  }
}
