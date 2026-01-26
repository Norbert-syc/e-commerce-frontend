import { Link } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  return (
    <div className="checkout-container main-content">
      <h1>Checkout</h1>

      <div className="checkout-wrapper">
        <section className="checkout-form">
          <h2>Shipping Information</h2>
          <form>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" placeholder="First name" required />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" placeholder="Last name" required />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="Email address" required />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="Phone number" required />
            </div>

            <div className="form-group">
              <label>Street Address</label>
              <input type="text" placeholder="Street address" required />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input type="text" placeholder="City" required />
              </div>
              <div className="form-group">
                <label>State</label>
                <input type="text" placeholder="State" required />
              </div>
              <div className="form-group">
                <label>ZIP Code</label>
                <input type="text" placeholder="ZIP code" required />
              </div>
            </div>

            <div className="form-group">
              <label>Country</label>
              <input type="text" placeholder="Country" required />
            </div>

            <h2 style={{ marginTop: "30px" }}>Payment Information</h2>

            <div className="form-group">
              <label>Cardholder Name</label>
              <input type="text" placeholder="Cardholder name" required />
            </div>

            <div className="form-group">
              <label>Card Number</label>
              <input type="text" placeholder="1234 5678 9012 3456" required />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Expiration Date</label>
                <input type="text" placeholder="MM/YY" required />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input type="text" placeholder="123" required />
              </div>
            </div>

            <label className="checkbox">
              <input type="checkbox" required />I agree to the Terms &
              Conditions
            </label>

            <button type="submit" className="place-order-btn">
              Place Order
            </button>
          </form>
        </section>

        <section className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-item">
            <span>Subtotal:</span>
            <span>$299.99</span>
          </div>
          <div className="summary-item">
            <span>Shipping:</span>
            <span>$10.00</span>
          </div>
          <div className="summary-item">
            <span>Tax:</span>
            <span>$24.80</span>
          </div>
          <div className="summary-item total">
            <span>Total:</span>
            <span>$334.79</span>
          </div>

          <div className="payment-methods">
            <h3>Payment Methods</h3>
            <label className="payment-option">
              <input type="radio" name="payment" defaultChecked />
              <span>Credit Card</span>
            </label>
            <label className="payment-option">
              <input type="radio" name="payment" />
              <span>Debit Card</span>
            </label>
            <label className="payment-option">
              <input type="radio" name="payment" />
              <span>PayPal</span>
            </label>
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
