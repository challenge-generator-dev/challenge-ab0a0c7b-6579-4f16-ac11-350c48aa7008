import { OrderItem } from './order-item.entity';

export class Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  total: number;
  status: string;

  constructor(id: string, customerId: string, items: OrderItem[], status: string = 'pending') {
    this.id = id;
    this.customerId = customerId;
    this.items = items;
    this.total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.status = status;
  }

  updateStatus(newStatus: string): void {
    this.status = newStatus;
  }

  updateItems(newItems: OrderItem[]): void {
    this.items = newItems;
    this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
}

export class OrderItem {
  productId: string;
  quantity: number;
  price: number;

  constructor(productId: string, quantity: number, price: number) {
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
  }
}