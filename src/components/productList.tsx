import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "./productCard";
import { getProducts } from "../api/productService";
import "./productList.css";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  // example rule for featured
  const featuredProducts = products.slice(0, 5);

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
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
