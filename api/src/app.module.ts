import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrderController } from './infrastructure/controllers/order.controller';
import { OrderService } from './application/services/order.service';
import { OrderRepositoryImpl } from './infrastructure/repositories/order.repository.impl';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: 'OrderRepository',
      useClass: OrderRepositoryImpl,
    },
  ],
})
export class AppModule {}