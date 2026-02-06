import { useState, useEffect } from 'react';
import api from '../../api/axios';

interface Order {
  _id: string;
  userId: string;
  items: Array<{
    productId: any;
    quantity: number;
  }>;
  total: number;
  status: string;
  createdAt: string;
}

const RecentOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState('All Status');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data.slice(0, 8));
    } catch (error) {
      console.error('Failed to fetch orders');
      setOrders([]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return '#10B981';
      case 'delivered': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'processing': return '#3B82F6';
      case 'shipped': return '#8B5CF6';
      case 'cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const filteredOrders = filter === 'All Status' 
    ? orders 
    : orders.filter(order => order.status.toLowerCase() === filter.toLowerCase());

  return (
    <div className="orders-card">
      <div className="orders-header">
        <h3>Recent Orders</h3>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>All Status</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
      </div>
      
      <div className="orders-table">
        <div className="table-header">
          <span>ORDER ID</span>
          <span>USER ID</span>
          <span>ITEMS</span>
          <span>TOTAL</span>
          <span>STATUS</span>
        </div>
        
        {filteredOrders.map((order) => (
          <div key={order._id} className="table-row">
            <span className="product-name">{order._id.slice(-8)}</span>
            <span>{order.userId.slice(-8)}</span>
            <span>{order.items?.length || 0}</span>
            <span>${order.total?.toFixed(2) || '0.00'}</span>
            <span 
              className="status-badge"
              style={{ backgroundColor: getStatusColor(order.status) }}
            >
              {order.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;
