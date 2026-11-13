import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../../hooks/useOrders';
import type { Order } from '../../types/order';

export function OrderList() {
  const navigate = useNavigate();
  const { orders, loading, error, deleteOrder, fetchOrder } = useOrders();

  useEffect(() => {
    fetchOrder('');
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta orden?')) {
      try {
        await deleteOrder(id);
        await fetchOrder('');
      } catch (err) {
        console.error('Error al eliminar la orden:', err);
      }
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/orders/${id}`);
  };

  const handleCreate = () => {
    navigate('/orders/new');
  };

  const handleRefresh = async () => {
    await fetchOrder('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Cargando órdenes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-lg text-red-600">Error: {error}</div>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Órdenes</h1>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
        >
          Nueva Orden
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No hay órdenes registradas.</p>
          <button
            onClick={handleCreate}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Crear primera orden
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order: Order) => (
            <OrderCard
              key={order.id}
              order={order}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface OrderCardProps {
  order: Order;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void | Promise<void>;
}

function OrderCard({ order, onEdit, onDelete }: OrderCardProps) {
  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  const statusClass = statusColors[order.status.toLowerCase()] || 'bg-gray-100 text-gray-800';

  return (
    <article className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Orden #{order.id.slice(0, 8)}</h2>
          <p className="text-sm text-gray-500">Cliente: {order.customerId}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}>
          {order.status}
        </span>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Items:</h3>
        <ul className="space-y-2">
          {order.items.map((item, index) => (
            <li key={index} className="flex justify-between text-sm bg-gray-50 p-2 rounded">
              <span className="text-gray-700">Producto: {item.productId}</span>
              <span className="text-gray-600">
                {item.quantity} x ${item.price.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div className="text-lg font-bold text-gray-800">
          Total: ${order.total.toFixed(2)}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(order.id)}
            className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(order.id)}
            className="px-3 py-1.5 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}