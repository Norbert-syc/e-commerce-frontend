import { Home, Package, Users, BarChart3, Settings } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar = ({ activeSection, setActiveSection }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'products', label: 'Product', icon: Package },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'campaigns', label: 'Campaigns', icon: BarChart3 },
  ];

  const bottomItems = [
    { id: 'help', label: 'Help Center', icon: Settings },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Nova</h2>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="sidebar-bottom">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className="nav-item"
              onClick={() => setActiveSection(item.id)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
        
        <div className="user-profile">
          <div className="user-avatar">JD</div>
          <div className="user-info">
            <div className="user-name">John Doe</div>
            <div className="user-role">Administrator</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;