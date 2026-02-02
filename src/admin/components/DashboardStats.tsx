const DashboardStats = () => {
  const stats = [
    {
      title: 'Target',
      subtitle: 'Monthly target progress',
      value: '$75,000',
      change: '+8% from yesterday',
      progress: 66.6,
      color: '#8B5CF6',
      icon: '📊'
    },
    {
      title: 'Revenue',
      subtitle: 'Based on previous',
      value: '$10,000',
      change: '+5% from yesterday', 
      progress: 45,
      color: '#06B6D4',
      icon: '💰'
    },
    {
      title: 'Orders',
      subtitle: 'Daily orders',
      value: '2,456',
      change: '+12% from yesterday',
      progress: 75,
      color: '#10B981',
      icon: '📦'
    }
  ];

  return (
    <div className="dashboard-stats">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-content">
            <div className="stat-title">{stat.title}</div>
            <div className="stat-subtitle">{stat.subtitle}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-change">{stat.change}</div>
            <div className="stat-progress-container">
              <div className="stat-progress-text">{stat.progress}%</div>
              <div className="stat-progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ 
                    width: `${stat.progress}%`,
                    backgroundColor: stat.color 
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;