import { useParams } from "react-router-dom";
import { useState } from "react";
import { products } from "../data/product";
import "./ProductDetails.css";

interface ProductDetailsProps {
  onAddToCart?: (item: any) => void;
}

const ProductDetails = ({ onAddToCart }: ProductDetailsProps) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id || ""));

  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product?.images[0] || "");

  if (!product) {
    return (
      <div className="product-details-container">
        <p>Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart({
        ...product,
        selectedColor,
        selectedSize,
        quantity,
      });
      alert(`${product.name} added to cart!`);
    }
  };

  const discountPercentage = product.discountPrice
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100,
      )
    : 0;

  const displayPrice = product.discountPrice || product.price;

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
            {discountPercentage > 0 && (
              <div className="featured-badge">{discountPercentage}% Off</div>
            )}
          </div>
          <div className="thumbnail-images">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} ${index + 1}`}
                className={`thumbnail ${mainImage === img ? "active" : ""}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Right side - Details */}
        <div className="product-details-content">
          <h1 className="product-title">{product.name}</h1>

          <div className="rating-section">
            <span className="stars">★★★★★</span>
            <span className="rating-value">{product.rating}</span>
          </div>

          <div className="price-section">
            <span className="current-price">${displayPrice.toFixed(2)}</span>
            {product.discountPrice && (
              <>
                <span className="original-price">
                  ${product.price.toFixed(2)}
                </span>
                <span className="discount-info">{discountPercentage}% Off</span>
              </>
            )}
          </div>

          <div className="stock-status in-stock">✓ In Stock</div>

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
