import { useSearchParams } from "react-router-dom";
import { products } from "../data/product";
import ProductCard from "../components/productCard";
import "../components/productList.css";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  // Filter products by search query (search in name, category)
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="main-content">
      <section className="featured-products-section">
        <div className="featured-container">
          <div className="section-header">
            <h2 className="section-title">
              Search Results for "{query}"
              {filteredProducts.length > 0 && ` (${filteredProducts.length})`}
            </h2>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                color: "#666",
              }}
            >
              <h3>No products found for "{query}"</h3>
              <p>
                Try searching for different keywords or browse our categories
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchResults;
