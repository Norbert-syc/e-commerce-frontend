import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/productCard";
import { getProducts } from "../api/productService";
import type { product } from "../types/product";
import "./shop.css";

const Shop = () => {
  const [products, setProducts] = useState<product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRating, setSelectedRating] = useState(0);

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  const categories = [
    "All",
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        selectedCategory === "All" || product.category === selectedCategory;

      const ratingMatch =
        selectedRating === 0 || product.rating >= selectedRating;

      return categoryMatch && ratingMatch;
    });
  }, [products, selectedCategory, selectedRating]);

  return (
    <div className="shop-page">
      <div className="shop-container">
        {/* Filters */}
        <div className="filters-section">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(Number(e.target.value))}
          >
            <option value={0}>All Ratings</option>
            <option value={4}>4+</option>
            <option value={4.5}>4.5+</option>
          </select>
        </div>

        {/* Products */}
        <div className="products-main">
          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
