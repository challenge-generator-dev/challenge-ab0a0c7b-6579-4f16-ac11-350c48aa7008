import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { OrderService } from '../../application/services/order.service';
import { Order } from '../../domain/entities/order.entity';

interface CreateOrderDto {
  customerId: string;
  items: { productId: string; quantity: number; price: number }[];
}

interface UpdateOrderDto {
  items?: { productId: string; quantity: number; price: number }[];
  status?: string;
}

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get(':id')
  async getOrder(@Param('id', ParseUUIDPipe) id: string): Promise<Order> {
    const order = await this.orderService.getOrder(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  @Put(':id')
  async updateOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const order = await this.orderService.updateOrder(id, updateOrderDto);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOrder(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.orderService.deleteOrder(id);
  }
}