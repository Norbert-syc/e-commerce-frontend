import type { product } from "../types/product";
import { Link } from "react-router-dom";
import "./productCard.css";

interface ProductCardProps {
  product: product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const discountPercentage = product.discountPrice
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100,
      )
    : 0;

  return (
    <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
      <div className="product-card">
        {discountPercentage > 0 && (  
          <div className="product-badge featured">{`${discountPercentage}% OFF`}</div>
        )}
        <div className="product-image">
          <img src={product.image} alt={product.name} />
          <button className="wishlist-btn">♥</button>
        </div>
        <div className="product-info">
          <div className="product-category">{product.category}</div>
          <h3 className="product-name">{product.name}</h3>
          <div className="product-rating">
            <span className="stars">★★★★★</span>
            <span className="rating-text">({product.rating})</span>
          </div>
          <div className="product-price">
            {product.discountPrice ? (
              <>
                <span className="original-price">
                  ${product.price.toFixed(2)}
                </span>
                <span className="discount-price">
                  ${product.discountPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="price">${product.price.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
