import type { product } from "../types/product";
import { Link } from "react-router-dom";
import "./productCard.css";

interface ProductCardProps {
  product: product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const {
    _id,
    id,
    slug,
    name,
    category,
    price,
    discountPrice,
    rating = 0,
    image,
    images,
  } = product;

  const productId = _id || id || slug;
  const productLink = `/product/${productId}`;

  const discountPercentage =
    discountPrice && price
      ? Math.round(((price - discountPrice) / price) * 100)
      : 0;

  const imageUrl =
    image ||
    images?.[0] ||
    "https://via.placeholder.com/300x300/f0f0f0/999999?text=No+Image";

  const handleWishlistClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: wishlist logic
  };

  return (
    <Link to={productLink} className="product-link">
      <article className="product-card">
        {discountPercentage > 0 && (
          <span className="product-badge">{discountPercentage}% OFF</span>
        )}

        <div className="product-image">
          <img src={imageUrl} alt={name} loading="lazy" />

          <button
            className="wishlist-btn"
            aria-label="Add to wishlist"
            onClick={handleWishlistClick}
          >
            ♥
          </button>
        </div>

        <div className="product-info">
          {category && <div className="product-category">{category}</div>}

          <h3 className="product-name">{name}</h3>

          <div className="product-rating">
            <span className="stars" aria-hidden>
              ★★★★★
            </span>
            <span className="rating-text">({rating.toFixed(1)})</span>
          </div>

          <div className="product-price">
            {discountPrice ? (
              <>
                <span className="original-price">${price.toFixed(2)}</span>
                <span className="discount-price">
                  ${discountPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="price">${price.toFixed(2)}</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
