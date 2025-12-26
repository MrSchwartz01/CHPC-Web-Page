import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BannersModule } from './banners/banners.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { ServiceOrdersModule } from './service-orders/service-orders.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { PromotionsModule } from './promotions/promotions.module';
import { SiteConfigModule } from './site-config/site-config.module';

@Module({
  imports: [
    // Configuración global
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // Base de datos con Prisma
    PrismaModule,
    // Módulos de la aplicación
    AuthModule,
    UsersModule,
    BannersModule,
    ProductsModule,
    OrdersModule,
    WishlistModule,
    ServiceOrdersModule,
    AnalyticsModule,
    PromotionsModule,
    SiteConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
