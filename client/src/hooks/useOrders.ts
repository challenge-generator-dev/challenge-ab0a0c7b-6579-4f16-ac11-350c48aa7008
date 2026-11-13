import { useState, useCallback } from 'react';
import { OrderService } from '../services/order.service';
import { Order, CreateOrderDto, UpdateOrderDto } from '../types/order';

const orderService = new OrderService();

export const useOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const createOrder = useCallback(async (orderDto: CreateOrderDto) => {
        setLoading(true);
        setError(null);
        try {
            const newOrder = await orderService.createOrder(orderDto);
            setOrders(prev => [...prev, newOrder]);
            return newOrder;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create order');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchOrder = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const order = await orderService.getOrder(id);
            setOrders(prev => prev.some(o => o.id === id) ? prev.map(o => o.id === id ? order : o) : [...prev, order]);
            return order;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch order');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateOrder = useCallback(async (id: string, updateDto: UpdateOrderDto) => {
        setLoading(true);
        setError(null);
        try {
            const updatedOrder = await orderService.updateOrder(id, updateDto);
            setOrders(prev => prev.map(order => order.id === id ? updatedOrder : order));
            return updatedOrder;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update order');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteOrder = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await orderService.deleteOrder(id);
            setOrders(prev => prev.filter(order => order.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete order');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        orders,
        loading,
        error,
        createOrder,
        fetchOrder,
        updateOrder,
        deleteOrder
    };
};