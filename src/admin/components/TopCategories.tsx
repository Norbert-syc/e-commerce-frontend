const TopCategories = () => {
  const categories = [
    { name: 'Smartphone', value: '5,210', percentage: '35%', color: '#8B5CF6' },
    { name: 'Earphone', value: '2,548', percentage: '18%', color: '#06B6D4' },
    { name: 'Smartwatch', value: '1,800', percentage: '12%', color: '#10B981' },
    { name: 'Mouse', value: '1,200', percentage: '8%', color: '#F59E0B' },
    { name: 'Keyboard', value: '732', percentage: '5%', color: '#EF4444' }
  ];

  return (
    <div className="categories-card">
      <div className="card-header">
        <h3>Top Categories</h3>
        <p>Sorted by sales</p>
      </div>
      
      <div className="categories-content">
        <div className="donut-chart">
          <div className="donut-center">
            <div className="total-value">1,212,120</div>
            <div className="total-label">Total Categories</div>
          </div>
        </div>
        
        <div className="categories-list">
          {categories.map((category, index) => (
            <div key={index} className="category-item">
              <div 
                className="category-dot" 
                style={{ backgroundColor: category.color }}
              />
              <div className="category-info">
                <span className="category-name">{category.name}</span>
                <span className="category-value">{category.value} ({category.percentage})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopCategories;