export interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    customerId: string;
    items: OrderItem[];
    total: number;
    status: string;
}

export interface CreateOrderDto {
    customerId: string;
    items: OrderItem[];
}

export interface UpdateOrderDto {
    items?: OrderItem[];
    status?: string;
}