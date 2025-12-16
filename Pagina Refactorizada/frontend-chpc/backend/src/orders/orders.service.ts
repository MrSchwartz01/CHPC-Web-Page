import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  private generateOrderCode(orderId: number): string {
    const padded = orderId.toString().padStart(6, '0');
    return `CHPC-${padded}`;
  }

  async createOrder(userId: number, dto: CreateOrderDto) {
    if (!dto.items || dto.items.length === 0) {
      throw new BadRequestException('La orden debe contener al menos un producto');
    }

    const productIds = dto.items.map((i) => i.productId);

    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== productIds.length) {
      throw new BadRequestException('Uno o más productos no existen');
    }

    let subtotal = 0;
    let totalItems = 0;

    const itemsData = dto.items.map((item) => {
      const product = products.find((p) => p.id === item.productId)!;
      const lineTotal = product.precio * item.cantidad;
      subtotal += lineTotal;
      totalItems += item.cantidad;

      return {
        productId: product.id,
        nombre: product.nombre_producto,
        precio: product.precio,
        cantidad: item.cantidad,
        total: lineTotal,
      };
    });

    const descuento = dto.descuento ?? 0;
    const total = subtotal - descuento;

    const created = await this.prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId,
          codigo: '', // se actualiza después con el id real
          totalItems,
          subtotal,
          descuento,
          total,
          status: 'PENDING' as any,
          paymentMethod: dto.paymentMethod as any,
          paymentRef: dto.paymentRef,
          nombre_cliente: dto.nombre_cliente,
          email_cliente: dto.email_cliente,
          telefono: dto.telefono,
          direccion_envio: dto.direccion_envio,
          observaciones: dto.observaciones,
          items: {
            create: itemsData,
          },
        },
        include: { items: true },
      });

      const codigo = this.generateOrderCode(order.id);

      const updated = await tx.order.update({
        where: { id: order.id },
        data: { codigo },
        include: { items: true },
      });

      return updated;
    });

    return created;
  }

  async findUserOrders(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneForUser(id: number, userId: number) {
    const order = await this.prisma.order.findFirst({
      where: { id, userId },
      include: { items: true },
    });

    if (!order) {
      throw new NotFoundException('Orden no encontrada');
    }

    return order;
  }

  async updateStatus(id: number, dto: UpdateOrderStatusDto) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) {
      throw new NotFoundException('Orden no encontrada');
    }

    return this.prisma.order.update({
      where: { id },
      data: { status: dto.status as any },
    });
  }
}
