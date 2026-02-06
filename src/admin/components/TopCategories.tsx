import { useState, useEffect } from 'react';
import { getCategories } from '../../api/categoryService';
import type { Category } from '../../types/category';

const TopCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data.slice(0, 5));
  };

  const colors = ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="categories-card">
      <div className="card-header">
        <h3>Top Categories</h3>
        <p>Sorted by sales</p>
      </div>
      
      <div className="categories-content">
        <div className="donut-chart">
          <div className="donut-center">
            <div className="total-value">{categories.length}</div>
            <div className="total-label">Total Categories</div>
          </div>
        </div>
        
        <div className="categories-list">
          {categories.map((category, index) => (
            <div key={category._id || category.id} className="category-item">
              <div 
                className="category-dot" 
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <div className="category-info">
                <span className="category-name">{category.name}</span>
                <span className="category-value">{category.description || 'No description'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopCategories;
