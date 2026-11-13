import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useOrders } from '../../hooks/useOrders';
import type { OrderItem, CreateOrderDto, UpdateOrderDto } from '../../types/order';

export function OrderForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id && id !== 'new');

  const { createOrder, updateOrder, fetchOrder, loading, error } = useOrders();

  const [customerId, setCustomerId] = useState('');
  const [items, setItems] = useState<OrderItem[]>([]);
  const [status, setStatus] = useState('pending');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode && id) {
      loadOrder(id);
    }
  }, [id, isEditMode]);

  const loadOrder = async (orderId: string) => {
    try {
      const order = await fetchOrder(orderId);
      if (order) {
        setCustomerId(order.customerId);
        setItems(order.items);
        setStatus(order.status);
      }
    } catch (err) {
      console.error('Error al cargar la orden:', err);
      setFormError('No se pudo cargar la orden.');
    }
  };

  const handleAddItem = () => {
    setItems([...items, { productId: '', quantity: 1, price: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: keyof OrderItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const calculateTotal = (): number => {
    return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  const validateForm = (): boolean => {
    if (!customerId.trim()) {
      setFormError('El ID del cliente es requerido.');
      return false;
    }
    if (items.length === 0) {
      setFormError('Debe agregar al menos un item.');
      return false;
    }
    for (const item of items) {
      if (!item.productId.trim()) {
        setFormError('Todos los items deben tener un ID de producto.');
        return false;
      }
      if (item.quantity <= 0) {
        setFormError('La cantidad debe ser mayor a 0.');
        return false;
      }
      if (item.price < 0) {
        setFormError('El precio no puede ser negativo.');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditMode && id) {
        const updateDto: UpdateOrderDto = {
          items,
          status,
        };
        await updateOrder(id, updateDto);
      } else {
        const createDto: CreateOrderDto = {
          customerId: customerId.trim(),
          items,
        };
        await createOrder(createDto);
      }
      navigate('/orders');
    } catch (err) {
      console.error('Error al guardar la orden:', err);
      setFormError('Error al guardar la orden. Intente de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/orders');
  };

  if (loading && isEditMode) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Cargando orden...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {isEditMode ? 'Editar Orden' : 'Nueva Orden'}
      </h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {formError && (
        <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="customerId" className="block text-sm font-medium text-gray-700 mb-1">
            ID del Cliente
          </label>
          <input
            type="text"
            id="customerId"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            disabled={isEditMode}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Ingrese el ID del cliente"
          />
        </div>

        {isEditMode && (
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="pending">Pendiente</option>
              <option value="processing">Procesando</option>
              <option value="completed">Completado</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>
        )}

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Items</label>
            <button
              type="button"
              onClick={handleAddItem}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
            >
              + Agregar Item
            </button>
          </div>

          {items.length === 0 ? (
            <p className="text-gray-500 text-sm italic">No hay items agregados.</p>
          ) : (
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="flex gap-3 items-start p-3 bg-gray-50 rounded-md">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={item.productId}
                      onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                      placeholder="ID Producto"
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="w-20">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                      min="1"
                      placeholder="Cant"
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="w-24">
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                      placeholder="Precio"
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="px-2 py-1.5 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div className="text-xl font-bold text-gray-800">
            Total: ${calculateTotal().toFixed(2)}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Guardando...' : isEditMode ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}