import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderOpen, Package, ShoppingCart, FileText } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import DashboardStats from '../components/DashboardStats';
import RevenueChart from '../components/RevenueChart';
import TopProducts from '../components/TopProducts';
import RecentOrders from '../components/RecentOrders';
import TopCategories from '../components/TopCategories';
import { getProducts } from '../../api/productService';
import { getCategories } from '../../api/categoryService';
import api from '../../api/axios';
import './Dashboard.css';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [productsCount, setProductsCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [cartsCount, setCartsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    const products = await getProducts();
    const categories = await getCategories();
    setProductsCount(products.length);
    setCategoriesCount(categories.length);
    
    try {
      const cartsRes = await api.get('/carts');
      const cartsData = Array.isArray(cartsRes.data) ? cartsRes.data : [cartsRes.data];
      setCartsCount(cartsData.length);
    } catch (error) {
      console.error('Failed to fetch carts');
    }
    
    try {
      const ordersRes = await api.get('/orders');
      setOrdersCount(ordersRes.data.length);
    } catch (error) {
      console.error('Failed to fetch orders');
    }
  };

  return (
    <div className="admin-dashboard">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="dashboard-main">
        <div className="dashboard-header">
          <h1>Welcome Back Norbs</h1>
          <p>Here's what's happening at your business today. See all at once</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
          <div style={{ padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <div style={{ background: '#f0f0f0', padding: '10px', borderRadius: '8px' }}>
                <FolderOpen size={32} color="#9333ea" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '14px', color: '#666' }}>Categories</h3>
                <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '5px 0', color: '#333' }}>{categoriesCount}</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/admin/categories')}
              style={{ width: '100%', padding: '10px 20px', background: '#9333ea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Manage Categories
            </button>
          </div>
          
          <div style={{ padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <div style={{ background: '#f0f0f0', padding: '10px', borderRadius: '8px' }}>
                <Package size={32} color="#9333ea" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '14px', color: '#666' }}>Products</h3>
                <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '5px 0', color: '#333' }}>{productsCount}</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/admin/products')}
              style={{ width: '100%', padding: '10px 20px', background: '#9333ea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Manage Products
            </button>
          </div>

          <div style={{ padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <div style={{ background: '#f0f0f0', padding: '10px', borderRadius: '8px' }}>
                <ShoppingCart size={32} color="#9333ea" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '14px', color: '#666' }}>Carts</h3>
                <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '5px 0', color: '#333' }}>{cartsCount}</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/admin/carts')}
              style={{ width: '100%', padding: '10px 20px', background: '#9333ea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Manage Carts
            </button>
          </div>

          <div style={{ padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <div style={{ background: '#f0f0f0', padding: '10px', borderRadius: '8px' }}>
                <FileText size={32} color="#9333ea" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '14px', color: '#666' }}>Orders</h3>
                <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '5px 0', color: '#333' }}>{ordersCount}</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/admin/orders')}
              style={{ width: '100%', padding: '10px 20px', background: '#9333ea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Manage Orders
            </button>
          </div>
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
