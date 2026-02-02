import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardStats from '../components/DashboardStats';
import RevenueChart from '../components/RevenueChart';
import TopProducts from '../components/TopProducts';
import RecentOrders from '../components/RecentOrders';
import TopCategories from '../components/TopCategories';
import './Dashboard.css';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <div className="admin-dashboard">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="dashboard-main">
        <div className="dashboard-header">
          <h1>Welcome Back John</h1>
          <p>Here's what's happening at your business today. See all at once</p>
        </div>
        
        <DashboardStats />
        
        <div className="dashboard-grid">
          <div className="dashboard-left">
            <RevenueChart />
            <TopProducts />
            <TopCategories />
          </div>
          
          <div className="dashboard-right">
            <RecentOrders />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;