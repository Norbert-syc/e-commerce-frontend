import { Link } from "react-router-dom";
import { products } from "../data/product";
import ProductCard from "./productCard";
import "./productList.css";

const FeaturedProducts = () => {
  // Get featured products (first 5 products or those with discount)
  const featuredProducts = products.filter((p) => p.discountPrice).slice(0, 5);

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
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
