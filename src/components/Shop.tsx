import { useState, useMemo } from "react";
import { products } from "../data/product";
import ProductCard from "./productCard";
import "./shop.css";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedRating, setSelectedRating] = useState<number>(0);

  // Get unique categories
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Filter products based on selected category and rating
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        selectedCategory === "All" || product.category === selectedCategory;
      const ratingMatch =
        selectedRating === 0 || product.rating >= selectedRating;
      return categoryMatch && ratingMatch;
    });
  }, [selectedCategory, selectedRating]);

  return (
    <div className="shop-page">
      <div className="shop-container">
        {/* Filters Section */}
        <div className="filters-section">
          <div className="filter-group">
            <label htmlFor="category-filter" className="filter-label">
              Category
            </label>
            <select
              id="category-filter"
              className="filter-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="rating-filter" className="filter-label">
              Minimum Rating
            </label>
            <select
              id="rating-filter"
              className="filter-select"
              value={selectedRating}
              onChange={(e) => setSelectedRating(Number(e.target.value))}
            >
              <option value={0}>All Ratings</option>
              <option value={4.0}>4.0 & above</option>
              <option value={4.5}>4.5 & above</option>
              <option value={4.8}>4.8 & above</option>
            </select>
          </div>

          <button
            className="reset-btn"
            onClick={() => {
              setSelectedCategory("All");
              setSelectedRating(0);
            }}
          >
            Reset Filters
          </button>
        </div>

        {/* Products Section */}
        <div className="products-main">
          <div className="products-header">
            <h1>All Products</h1>
            <span className="product-count">
              {filteredProducts.length} products found
            </span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <p>No products found matching your filters.</p>
              <button
                className="reset-btn"
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedRating(0);
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
