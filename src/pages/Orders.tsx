import { useState, useEffect } from "react";
import { getUserOrders } from "../api/orderService";
import "./Orders.css";

interface Order {
  _id: string;
  items: Array<{
    productId: any;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: string;
  shippingAddress: string;
  createdAt: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getUserOrders();
      setOrders(data);
    } catch (error: any) {
      if (error.response?.status === 404) {
        setOrders([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "#10b981";
      case "shipped": return "#3b82f6";
      case "processing": return "#f59e0b";
      case "cancelled": return "#ef4444";
      default: return "#6b7280";
    }
  };

  if (loading) {
    return (
      <div className="orders-container main-content">
        <h1>My Orders</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="orders-container main-content">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div>
                  <span className="order-id">Order #{order._id.slice(-8)}</span>
                  <span className="order-date">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span 
                    className="order-status"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {order.status.toUpperCase()}
                  </span>
                  <button 
                    onClick={fetchOrders}
                    style={{ 
                      padding: "6px 12px", 
                      background: "#3b82f6", 
                      color: "white", 
                      border: "none", 
                      borderRadius: "4px", 
                      cursor: "pointer",
                      fontSize: "12px"
                    }}
                  >
                    Refresh
                  </button>
                </div>
              </div>

              <div className="order-items">
                {order.items.map((item, idx) => (
                  <div key={idx} className="order-item">
                    <span>{item.productId?.name || "Product"}</span>
                    <span>Qty: {item.quantity}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="order-address">
                  <strong>Shipping Address:</strong>
                  <p>{order.shippingAddress}</p>
                </div>
                <div className="order-total">
                  <strong>Total: ${order.total.toFixed(2)}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
