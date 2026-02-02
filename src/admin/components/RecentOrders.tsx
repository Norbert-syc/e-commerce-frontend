const RecentOrders = () => {
  const orders = [
    { id: 'Yira Pro 50 SD', customer: 'Ahmed Adnan', total: '$67,000', date: '15 Jan 2024', status: 'Delivered' },
    { id: 'Everyone 01', customer: 'Alexander Gr', total: '$15,000', date: '15 Jan 2024', status: 'Pending' },
    { id: 'Yira Earphone', customer: 'Andrew Wilson', total: '$67,000', date: '15 Jan 2024', status: 'Cancelled' },
    { id: 'Mouse Logi 15', customer: 'Benjamin Wil', total: '$15,000', date: '15 Jan 2024', status: 'Delivered' },
    { id: 'Yira Smartphone', customer: 'Biswajit Wil', total: '$67,000', date: '15 Jan 2024', status: 'Pending' },
    { id: 'Mouse Logitech', customer: 'Biswajit Wil', total: '$15,000', date: '15 Jan 2024', status: 'Delivered' },
    { id: 'Yira WIRELESS', customer: 'Camilla Olivia', total: '$67,000', date: '15 Jan 2024', status: 'Pending' },
    { id: 'Yira Smartphone', customer: 'Diana Wilson', total: '$15,000', date: '15 Jan 2024', status: 'Cancelled' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return '#10B981';
      case 'Pending': return '#F59E0B';
      case 'Cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <div className="orders-card">
      <div className="orders-header">
        <h3>Recent Orders</h3>
        <select>
          <option>All Status</option>
          <option>Delivered</option>
          <option>Pending</option>
          <option>Cancelled</option>
        </select>
      </div>
      
      <div className="orders-table">
        <div className="table-header">
          <span>PRODUCT</span>
          <span>CUSTOMER</span>
          <span>TOTAL</span>
          <span>DATE</span>
          <span>STATUS</span>
        </div>
        
        {orders.map((order, index) => (
          <div key={index} className="table-row">
            <span className="product-name">{order.id}</span>
            <span>{order.customer}</span>
            <span>{order.total}</span>
            <span>{order.date}</span>
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