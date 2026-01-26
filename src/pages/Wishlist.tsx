import { Link } from "react-router-dom";
import "./Wishlist.css";

interface WishlistProps {
  items: any[];
  setItems: (items: any[]) => void;
}

const Wishlist = ({ items = [], setItems }: WishlistProps) => {
  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="wishlist-container main-content">
      <h1>My Wishlist</h1>

      {items.length === 0 ? (
        <div className="empty-wishlist">
          <p>Your wishlist is empty</p>
          <Link to="/shop" className="start-shopping-btn">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {items.map((item, index) => (
            <div key={index} className="wishlist-item">
              <div className="wishlist-image">
                <img src={item.images?.[0]} alt={item.name} />
                <button
                  className="remove-wishlist-btn"
                  onClick={() => removeItem(index)}
                  title="Remove from wishlist"
                >
                  ✕
                </button>
              </div>
              <div className="wishlist-info">
                <h3>{item.name}</h3>
                <div className="wishlist-price">
                  {item.discountPrice ? (
                    <>
                      <span className="original">${item.price.toFixed(2)}</span>
                      <span className="discount">
                        ${item.discountPrice.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span>${item.price.toFixed(2)}</span>
                  )}
                </div>
                <Link to={`/product/${item.id}`} className="view-product-btn">
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
