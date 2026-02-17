import { useState, useEffect } from "react";
import api from "../../api/axios";

interface Order {
  _id: string;
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: string;
  shippingAddress: string;
  createdAt: string;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await api.get("/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
      alert("Order status updated! Customer will see the change.");
    } catch (error) {
      alert("Failed to update order status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    
    try {
      await api.delete(`/orders/${id}`);
      fetchOrders();
      alert('Order deleted!');
    } catch (error: any) {
      if (error.response?.status === 404) {
        alert('Delete endpoint not implemented yet. Contact backend developer.');
      } else {
        alert('Failed to delete order: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  return (
    <div style={{ padding: "20px", background: "white", minHeight: "100vh" }}>
      <h1 style={{ color: "black" }}>Orders Management</h1>

      <h2 style={{ color: "black", marginTop: "30px" }}>All Orders</h2>
      {loading ? <p style={{ color: "black" }}>Loading...</p> : (
        <table style={{ width: "100%", borderCollapse: "collapse", background: "white" }}>
          <thead>
            <tr style={{ background: "white" }}>
              <th style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>Order ID</th>
              <th style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>User ID</th>
              <th style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>Items</th>
              <th style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>Total</th>
              <th style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>Status</th>
              <th style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>Date</th>
              <th style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const calculatedTotal = order.total || order.items?.reduce((sum: number, item: any) => {
                return sum + (item.price * item.quantity);
              }, 0) || 0;
              
              return (
              <tr key={order._id}>
                <td style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>{order._id}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>{order.userId}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>{order.items?.length || 0}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>${calculatedTotal.toFixed(2)}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>
                  <span style={{ 
                    padding: "4px 8px", 
                    borderRadius: "4px", 
                    background: order.status === 'completed' ? '#10b981' : order.status === 'pending' ? '#f59e0b' : '#6b7280',
                    color: 'white',
                    fontSize: '12px'
                  }}>
                    {order.status}
                  </span>
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>
                  <select 
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                    style={{ padding: "5px", border: "1px solid #ccc", borderRadius: "4px", marginRight: "10px" }}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button 
                    onClick={() => handleDelete(order._id)}
                    style={{ padding: "5px 10px", background: "#ef4444", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersPage;
