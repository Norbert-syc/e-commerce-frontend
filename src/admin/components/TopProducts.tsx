import { useState, useEffect } from 'react';
import { getProducts } from '../../api/productService';
import type { Product } from '../../types/product';

const TopProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data.slice(0, 5));
  };

  return (
    <div className="products-card">
      <div className="card-header">
        <h3>Top Product</h3>
        <p>Sorted by best seller</p>
      </div>
      
      <div className="products-list">
        {products.map((product) => (
          <div key={product._id || product.id} className="product-item">
            <div className="product-image">
              {product.image ? (
                <img src={product.image} alt={product.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
              ) : '📦'}
            </div>
            <div className="product-details">
              <div className="product-name">{product.name}</div>
              <div className="product-category">
                {typeof product.category === 'string' ? product.category : 
                 typeof product.categoryId === 'string' ? product.categoryId : 'N/A'}
              </div>
            </div>
            <div className="product-price">${product.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
