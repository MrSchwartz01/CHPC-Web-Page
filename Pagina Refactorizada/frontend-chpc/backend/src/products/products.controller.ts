import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { FilterProductsDto } from './dto/filter-products.dto';

@Controller('tienda/productos')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(@Query() filters: FilterProductsDto) {
    return await this.productsService.findAll(filters);
  }
}
