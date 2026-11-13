import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../../application/services/order.service';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { Order } from '../../domain/entities/order.entity';

describe('OrderService', () => {
  let service: OrderService;
  let repository: jest.Mocked<OrderRepository>;

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: 'OrderRepository',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    repository = module.get('OrderRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOrder', () => {
    it('TODO(reto): implementar prueba para crear una orden exitosamente', async () => {
      // Arrange
      const createOrderDto = {
        customerId: 'cust-123',
        items: [
          { productId: 'prod-1', quantity: 2, price: 10.00 },
        ],
      };
      
      const expectedOrder = new Order(
        'order-123',
        'cust-123',
        createOrderDto.items,
        'pending'
      );

      repository.create.mockResolvedValue(expectedOrder);

      // Act
      // TODO(reto): llamar a service.createOrder y verificar el resultado

      // Assert
      // TODO(reto): verificar que repository.create fue llamado con los datos correctos
    });

    it('TODO(reto): implementar prueba para manejar error al crear orden con datos inválidos', async () => {
      // Arrange
      const invalidOrderDto = {
        customerId: '',
        items: [],
      };

      // Act & Assert
      // TODO(reto): verificar que se lanza excepción cuando los datos son inválidos
    });
  });

  describe('getOrder', () => {
    it('TODO(reto): implementar prueba para obtener una orden por ID', async () => {
      // Arrange
      const orderId = 'order-123';
      const expectedOrder = new Order(
        orderId,
        'cust-123',
        [{ productId: 'prod-1', quantity: 1, price: 10.00 }],
        'pending'
      );

      repository.findById.mockResolvedValue(expectedOrder);

      // Act
      // TODO(reto): llamar a service.getOrder y verificar el resultado

      // Assert
      // TODO(reto): verificar que repository.findById fue llamado con el ID correcto
    });

    it('TODO(reto): implementar prueba para manejar orden no encontrada', async () => {
      // Arrange
      repository.findById.mockResolvedValue(null);

      // Act & Assert
      // TODO(reto): verificar que se lanza excepción cuando la orden no existe
    });
  });

  describe('updateOrder', () => {
    it('TODO(reto): implementar prueba para actualizar una orden exitosamente', async () => {
      // Arrange
      const orderId = 'order-123';
      const updateOrderDto = { status: 'completed' };
      
      const existingOrder = new Order(
        orderId,
        'cust-123',
        [{ productId: 'prod-1', quantity: 1, price: 10.00 }],
        'pending'
      );

      const updatedOrder = new Order(
        orderId,
        'cust-123',
        existingOrder.items,
        'completed'
      );

      repository.update.mockResolvedValue(updatedOrder);

      // Act
      // TODO(reto): llamar a service.updateOrder y verificar el resultado

      // Assert
      // TODO(reto): verificar que repository.update fue llamado con los datos correctos
    });
  });

  describe('deleteOrder', () => {
    it('TODO(reto): implementar prueba para eliminar una orden exitosamente', async () => {
      // Arrange
      const orderId = 'order-123';
      repository.delete.mockResolvedValue();

      // Act
      // TODO(reto): llamar a service.deleteOrder

      // Assert
      // TODO(reto): verificar que repository.delete fue llamado con el ID correcto
    });
  });
});