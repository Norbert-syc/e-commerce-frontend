import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "./productCard";
import { getProducts } from "../api/productService";
import type { Product } from "../types/product";
import "./productList.css";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // example rule for featured
  const featuredProducts = products.slice(0, 5);

  if (loading) {
    return (
      <section className="featured-products-section">
        <div className="featured-container">
          <div className="section-header">
            <h2 className="section-title">FEATURED PRODUCTS</h2>
          </div>
          <div className="loading">Loading products...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="featured-products-section">
      <div className="featured-container">
        <div className="section-header">
          <h2 className="section-title">FEATURED PRODUCTS</h2>
          <Link to="/shop" className="view-all-btn">
            VIEW ALL
          </Link>
        </div>

        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
