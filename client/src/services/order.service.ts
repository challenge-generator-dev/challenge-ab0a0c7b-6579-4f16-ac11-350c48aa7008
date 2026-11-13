import axios from 'axios';
import { Order, OrderItem, CreateOrderDto, UpdateOrderDto } from '../types/order';

const API_BASE_URL = 'http://localhost:3000';

export class OrderService {
    async createOrder(orderDto: CreateOrderDto): Promise<Order> {
        try {
            const response = await axios.post<Order>(`${API_BASE_URL}/orders`, orderDto);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Error creating order: ${error.response?.data?.message || error.message}`);
            }
            throw new Error('Error creating order: Unknown error');
        }
    }

    async getOrder(id: string): Promise<Order> {
        try {
            const response = await axios.get<Order>(`${API_BASE_URL}/orders/${id}`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Error fetching order: ${error.response?.data?.message || error.message}`);
            }
            throw new Error('Error fetching order: Unknown error');
        }
    }

    async updateOrder(id: string, updateDto: UpdateOrderDto): Promise<Order> {
        try {
            const response = await axios.put<Order>(`${API_BASE_URL}/orders/${id}`, updateDto);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Error updating order: ${error.response?.data?.message || error.message}`);
            }
            throw new Error('Error updating order: Unknown error');
        }
    }

    async deleteOrder(id: string): Promise<void> {
        try {
            await axios.delete(`${API_BASE_URL}/orders/${id}`);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Error deleting order: ${error.response?.data?.message || error.message}`);
            }
            throw new Error('Error deleting order: Unknown error');
        }
    }
}