import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCart } from "../api/cartService";
import api from "../api/axios";
import "./Checkout.css";

const Checkout = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const cartData = await getCart();
      const items = cartData.items || [];
      setCartItems(items);
      
      const total = items.reduce((sum: number, item: any) => {
        const price = item.productId?.price || item.price || 0;
        return sum + (price * item.quantity);
      }, 0);
      setSubtotal(total);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to place an order');
        navigate('/signin');
        return;
      }

      if (cartItems.length === 0) {
        alert('Your cart is empty');
        return;
      }

      const shippingAddress = `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}, ${formData.country}`;
      
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.productId?._id || item.productId,
          quantity: item.quantity,
          price: item.productId?.price || item.price
        })),
        shippingAddress,
        paymentMethod: 'Credit Card',
        total: total
      };

      await api.post('/orders', orderData);

      alert('Order placed successfully!');
      navigate('/');
    } catch (error: any) {
      console.error('Failed to place order:', error);
      alert(error.response?.data?.message || 'Failed to place order');
    }
  };

  const tax = subtotal * 0.1;
  const shipping = 10;
  const total = subtotal + tax + shipping;

  return (
    <div className="checkout-container main-content">
      <h1>Checkout</h1>

      <div className="checkout-wrapper">
        <section className="checkout-form">
          <h2>Shipping Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input 
                  type="text" 
                  placeholder="First name" 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input 
                  type="text" 
                  placeholder="Last name" 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                placeholder="Email address" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required 
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input 
                type="tel" 
                placeholder="Phone number" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required 
              />
            </div>

            <div className="form-group">
              <label>Street Address</label>
              <input 
                type="text" 
                placeholder="Street address" 
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                required 
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input 
                  type="text" 
                  placeholder="City" 
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <input 
                  type="text" 
                  placeholder="State" 
                  value={formData.state}
                  onChange={(e) => setFormData({...formData, state: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>ZIP Code</label>
                <input 
                  type="text" 
                  placeholder="ZIP code" 
                  value={formData.zip}
                  onChange={(e) => setFormData({...formData, zip: e.target.value})}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label>Country</label>
              <input 
                type="text" 
                placeholder="Country" 
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
                required 
              />
            </div>

            <button type="submit" className="place-order-btn">
              Place Order
            </button>
          </form>
        </section>

        <section className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-item">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Shipping:</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Tax:</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="summary-item total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <Link to="/cart" className="edit-cart-link">
            ← Edit Cart
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Checkout;
