import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Footer Top Section */}
        <div className="footer-top">
          <div className="footer-section footer-info">
            <h3 className="footer-logo">kapee.</h3>
            <p className="footer-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <div className="footer-contact">
              <p>
                <span className="icon">📍</span> kigali-Rwanda
              </p>
              <p>
                <span className="icon">📞</span> 250789309376
              </p>
              <p>
                <span className="icon">✉️</span> info@kapee.com
              </p>
              <p>
                <span className="icon">🕐</span> Mon - Fri / 9:00 AM - 6:00 PM
              </p>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-section-title">INFORMATION</h4>
            <ul className="footer-links">
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#store">Store Location</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
              <li>
                <a href="#shipping">Shipping & Delivery</a>
              </li>
              <li>
                <a href="#news">Latest News</a>
              </li>
              <li>
                <a href="#sitemap">Our Sitemap</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-section-title">OUR SERVICE</h4>
            <ul className="footer-links">
              <li>
                <a href="#privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms">Terms of Sale</a>
              </li>
              <li>
                <a href="#customer">Customer Service</a>
              </li>
              <li>
                <a href="#delivery">Delivery Information</a>
              </li>
              <li>
                <a href="#payments">Payments</a>
              </li>
              <li>
                <a href="#saved">Saved Cards</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-section-title">MY ACCOUNT</h4>
            <ul className="footer-links">
              <li>
                <a href="#account">My Account</a>
              </li>
              <li>
                <a href="#shop">My Shop</a>
              </li>
              <li>
                <a href="#cart">My Cart</a>
              </li>
              <li>
                <a href="#checkout">Checkout</a>
              </li>
              <li>
                <a href="#wishlist">My Wishlist</a>
              </li>
              <li>
                <a href="#tracking">Tracking Order</a>
              </li>
            </ul>
          </div>

          <div className="footer-section footer-newsletter">
            <h4 className="footer-section-title">NEWSLETTER</h4>
            <p className="newsletter-text">
              Subscribe to our mailing list to get the new updates!
            </p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Your email address"
                className="newsletter-input"
              />
              <button className="newsletter-btn">SIGN UP</button>
            </div>
            <div className="social-icons">
              <a href="#facebook" className="social-icon" title="Facebook">
                f
              </a>
              <a href="#twitter" className="social-icon" title="Twitter">
                𝕏
              </a>
              <a href="#linkedin" className="social-icon" title="LinkedIn">
                in
              </a>
              <a href="#instagram" className="social-icon" title="Instagram">
                📷
              </a>
              <a href="#pinterest" className="social-icon" title="Pinterest">
                📌
              </a>
              <a href="#youtube" className="social-icon" title="YouTube">
                ▶
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>Kapee © 2026 by PresLayouts All Rights Reserved.</p>
          </div>
          <div className="footer-payment-methods">
            <span className="payment-icon visa">Visa</span>
            <span className="payment-icon paypal">PayPal</span>
            <span className="payment-icon discover">Discover</span>
            <span className="payment-icon mastercard">Mastercard</span>
            <span className="payment-icon amex">American Express</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
