import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BannersModule } from './banners/banners.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [BannersModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
