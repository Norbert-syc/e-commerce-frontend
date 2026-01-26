import { Link } from "react-router-dom";
import "./Cart.css";

interface CartProps {
  items: any[];
  setItems: (items: any[]) => void;
}

const Cart = ({ items = [], setItems }: CartProps) => {
  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(index);
    } else {
      const newItems = [...items];
      newItems[index].quantity = quantity;
      setItems(newItems);
    }
  };

  const subtotal = items.reduce((sum, item) => {
    const price = item.discountPrice || item.price;
    return sum + price * (item.quantity || 1);
  }, 0);

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="cart-container main-content">
      <h1>Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/shop" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-wrapper">
          <div className="cart-items">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => {
                  const price = item.discountPrice || item.price;
                  const itemTotal = price * (item.quantity || 1);
                  return (
                    <tr key={index}>
                      <td className="product-name">
                        <img src={item.images?.[0]} alt={item.name} />
                        <span>{item.name}</span>
                      </td>
                      <td>${price.toFixed(2)}</td>
                      <td>
                        <div className="quantity-input">
                          <button
                            onClick={() =>
                              updateQuantity(index, (item.quantity || 1) - 1)
                            }
                          >
                            −
                          </button>
                          <input
                            type="number"
                            value={item.quantity || 1}
                            onChange={(e) =>
                              updateQuantity(
                                index,
                                parseInt(e.target.value) || 1,
                              )
                            }
                          />
                          <button
                            onClick={() =>
                              updateQuantity(index, (item.quantity || 1) + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>${itemTotal.toFixed(2)}</td>
                      <td>
                        <button
                          className="remove-btn"
                          onClick={() => removeItem(index)}
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (10%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
            </Link>
            <Link to="/shop" className="continue-shopping-link">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
