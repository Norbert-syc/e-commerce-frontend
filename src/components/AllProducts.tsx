import { products } from "../data/product";
import ProductCard from "./productCard";
import "./productList.css";

const AllProducts = () => {
  return (
    <div className="main-content">
      <section className="featured-products-section">
        <div className="featured-container">
          <div className="section-header">
            <h2 className="section-title">ALL PRODUCTS</h2>
          </div>

          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllProducts;
