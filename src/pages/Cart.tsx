import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCart, updateCartItem, removeFromCart } from "../api/cartService";
import { useCart } from "../contexts/CartContext";
import "./Cart.css";

const Cart = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const { updateCartCount } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const cartData = await getCart();
      console.log('Cart response:', cartData);
      console.log('Cart items:', cartData.items);
      
      // Log each item to see structure
      if (cartData.items) {
        cartData.items.forEach((item: any, index: number) => {
          console.log(`Item ${index}:`, item);
          console.log(`ProductId:`, item.productId);
        });
      }
      
      // Handle different possible response structures
      if (cartData && cartData.items) {
        setItems(cartData.items);
      } else if (Array.isArray(cartData)) {
        setItems(cartData);
      } else {
        setItems([]);
      }
      setError("");
    } catch (error: any) {
      console.error('Failed to fetch cart:', error);
      setError("Failed to load cart");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }

    try {
      await updateCartItem(productId, newQuantity);
      
      // Update local state
      setItems(prevItems => 
        prevItems.map(item => 
          (item.productId?._id || item.productId) === productId 
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
      updateCartCount();
    } catch (error) {
      console.error('Failed to update quantity:', error);
      alert('Failed to update quantity');
    }
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      await removeFromCart(productId);
      
      // Update local state
      setItems(prevItems => 
        prevItems.filter(item => 
          (item.productId?._id || item.productId) !== productId
        )
      );
      updateCartCount();
    } catch (error) {
      console.error('Failed to remove item:', error);
      alert('Failed to remove item');
    }
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => {
      const price = getItemPrice(item);
      return sum + (price * item.quantity);
    }, 0);
  };

  const getItemPrice = (item: any) => {
    // Handle different data structures
    if (item.productId && typeof item.productId === 'object') {
      return item.productId.price || 0;
    }
    return item.price || 0;
  };

  const getItemName = (item: any) => {
    if (item.productId && typeof item.productId === 'object') {
      return item.productId.name || 'Unknown Product';
    }
    return item.name || 'Unknown Product';
  };

  const getItemImage = (item: any) => {
    if (item.productId && typeof item.productId === 'object') {
      return item.productId.image || null;
    }
    return item.image || null;
  };

  const getItemId = (item: any) => {
    if (item.productId && typeof item.productId === 'object') {
      return item.productId._id;
    }
    return item.productId || item._id;
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (loading) {
    return (
      <div className="cart-container main-content">
        <h1>Shopping Cart</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cart-container main-content">
        <h1>Shopping Cart</h1>
        <p>Error: {error}</p>
        <button onClick={fetchCart}>Retry</button>
      </div>
    );
  }

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
                  const price = getItemPrice(item);
                  const itemTotal = price * item.quantity;
                  const itemId = getItemId(item);
                  
                  return (
                    <tr key={itemId || index}>
                      <td className="product-name">
                        {getItemImage(item) ? (
                          <img 
                            src={getItemImage(item)} 
                            alt={getItemName(item)}
                            onError={(e) => {
                              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUI5QjlCIiBmb250LXNpemU9IjhweCIgZm9udC1mYW1pbHk9IkFyaWFsIj5ObyBJbWFnZTwvdGV4dD4KPHN2Zz4=';
                            }}
                          />
                        ) : (
                          <img 
                            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUI5QjlCIiBmb250LXNpemU9IjhweCIgZm9udC1mYW1pbHk9IkFyaWFsIj5ObyBJbWFnZTwvdGV4dD4KPHN2Zz4=" 
                            alt={getItemName(item)}
                          />
                        )}
                        <span>{getItemName(item)}</span>
                      </td>
                      <td>${price.toFixed(2)}</td>
                      <td>
                        <div className="quantity-input">
                          <button
                            onClick={() => handleUpdateQuantity(itemId, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            −
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                              const newQty = parseInt(e.target.value) || 1;
                              handleUpdateQuantity(itemId, newQty);
                            }}
                            min="1"
                          />
                          <button
                            onClick={() => handleUpdateQuantity(itemId, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>${itemTotal.toFixed(2)}</td>
                      <td>
                        <button
                          className="remove-btn"
                          onClick={() => handleRemoveItem(itemId)}
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