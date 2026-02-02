const TopProducts = () => {
  const products = [
    { name: 'Everyone 01', price: '$17,078', image: '👕', category: 'Clothing' },
    { name: 'YWS Earphone M4', price: '$17,078', image: '🎧', category: 'Electronics' },
    { name: 'Yira Rib 03', price: '$17,078', image: '👔', category: 'Clothing' },
    { name: 'Yira Smartphone', price: '$17,078', image: '📱', category: 'Electronics' },
    { name: 'YWS Earphone 02', price: '$17,078', image: '🎧', category: 'Electronics' }
  ];

  return (
    <div className="products-card">
      <div className="card-header">
        <h3>Top Product</h3>
        <p>Sorted by best seller</p>
      </div>
      
      <div className="products-list">
        {products.map((product, index) => (
          <div key={index} className="product-item">
            <div className="product-image">{product.image}</div>
            <div className="product-details">
              <div className="product-name">{product.name}</div>
              <div className="product-category">{product.category}</div>
            </div>
            <div className="product-price">{product.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;