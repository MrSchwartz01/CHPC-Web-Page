import { Controller, Get } from '@nestjs/common';
import { BannersService } from './banners.service';

@Controller('tienda/banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Get()
  async findAll() {
    const data = await this.bannersService.findAll();
    return { data };
  }
}
