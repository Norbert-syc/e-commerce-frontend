import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProductById } from "../api/productService";
import { addToCart } from "../api/cartService";
import { useCart } from "../contexts/CartContext";
import type { Product } from "../types/product";
import "./ProductDetails.css";

interface ProductDetailsProps {
  onAddToCart?: (item: any) => void;
}

const ProductDetails = () => {
  const { id } = useParams();
  const { updateCartCount } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (id) {
      getProductById(id)
        .then((data) => {
          setProduct(data);
          setMainImage(data.image);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div className="product-details-container">
        <p>Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-details-container">
        <p>Product not found</p>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      await addToCart({
        productId: product._id,
        quantity,
        selectedColor,
        selectedSize,
      });
      updateCartCount();
      alert(`${product.name} added to cart!`);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('Failed to add to cart. Please try again.');
    }
  };

  const discountPercentage = 0; // Backend data doesn't have discount info
  const displayPrice = product.price;

  const colors = ["#2E5BFF", "#808080", "#8B0000"];
  const sizes = ["S", "M", "L", "XL"];

  return (
    <div className="product-details-container main-content">
      <div className="breadcrumb">
        <a href="/">Home</a> / <a href="/shop">Shop</a> /{" "}
        <span>{product.category}</span> / <span>{product.name}</span>
      </div>

      <div className="product-details-wrapper">
        {/* Left side - Images */}
        <div className="product-images-section">
          <div className="main-image-container">
            <img src={mainImage} alt={product.name} className="main-image" />
          </div>
          <div className="thumbnail-images">
            <img
              src={product.image}
              alt={product.name}
              className="thumbnail active"
            />
          </div>
        </div>

        {/* Right side - Details */}
        <div className="product-details-content">
          <h1 className="product-title">{product.name}</h1>

          <div className="rating-section">
            <span className="stars">★★★★★</span>
            <span className="rating-value">4.5</span>
          </div>

          <div className="price-section">
            <span className="current-price">${displayPrice.toFixed(2)}</span>
          </div>

          <div className="stock-status in-stock">✓ {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}</div>

          <div className="offers-section">
            <div className="offer-item">
              <span className="offer-label">Special Price</span>
              <span className="offer-text">
                Get extra 15% off (price inclusive of discount) T & C
              </span>
            </div>
            <div className="offer-item">
              <span className="offer-label">Bank Offer</span>
              <span className="offer-text">
                10% instant discount on VISA Cards T & C
              </span>
            </div>
            <div className="offer-item">
              <span className="offer-label">No cost EMI</span>
              <span className="offer-text">
                $49/month. Standard EMI also available View Plans
              </span>
            </div>
          </div>

          {/* Color Selection */}
          <div className="selection-section">
            <label>Color:</label>
            <div className="color-options">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`color-btn ${selectedColor === color ? "selected" : ""}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="selection-section">
            <label>Size:</label>
            <button className="clear-btn" onClick={() => setSelectedSize("")}>
              Clear
            </button>
            <div className="size-options">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? "selected" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="services-section">
            <h3>Services:</h3>
            <ul>
              <li>30 Day Return Policy ↗</li>
              <li>Cash on Delivery available ↗</li>
              <li>Free Delivery ↗</li>
            </ul>
          </div>

          {/* Quantity and Actions */}
          <div className="quantity-section">
            <label>Quantity:</label>
            <div className="quantity-selector">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="qty-btn"
              >
                −
              </button>
              <input type="number" value={quantity} readOnly />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="qty-btn"
              >
                +
              </button>
            </div>
          </div>

          <div className="action-buttons">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              ADD TO CART
            </button>
            <button className="buy-now-btn">BUY NOW</button>
          </div>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="highlights-section">
        <h3>Highlights:</h3>
        <ul>
          <li>Regular Fit</li>
          <li>Full sleeves</li>
          <li>70% cotton, 30% polyester</li>
          <li>Easy to wear and versatile as Casual</li>
          <li>Machine wash, tumble dry</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDetails;
