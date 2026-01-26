import "./InfoPages.css";

const About = () => {
  return (
    <div className="info-container main-content">
      <h1>About Kapee.</h1>

      <section className="info-section">
        <h2>Our Story</h2>
        <p>
          Kapee. is an online fashion and lifestyle boutique dedicated to
          bringing you the latest trends and timeless classics. Founded with a
          passion for quality and style, we believe that everyone deserves
          access to premium fashion at affordable prices.
        </p>
      </section>

      <section className="info-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to empower individuals through fashion by providing
          curated collections of high-quality clothing, accessories, and
          footwear from around the world. We are committed to sustainable
          practices and ethical sourcing.
        </p>
      </section>

      <section className="info-section">
        <h2>Why Choose Us</h2>
        <ul>
          <li>✓ Curated Selection: Handpicked products from top brands</li>
          <li>
            ✓ Quality Assurance: All items meet our strict quality standards
          </li>
          <li>
            ✓ Affordable Prices: Competitive pricing with regular discounts
          </li>
          <li>✓ Fast Shipping: Quick and reliable delivery</li>
          <li>✓ Customer Support: 24/7 customer service</li>
          <li>✓ Easy Returns: Hassle-free 30-day return policy</li>
        </ul>
      </section>

      <section className="info-section">
        <h2>Contact Us</h2>
        <p>
          Have questions? We'd love to hear from you!
          <br />
          Email: support@kapee.com
          <br />
          Phone: 1-800-KAPEE-1
          <br />
          Hours: Monday - Friday, 9am - 6pm EST
        </p>
      </section>
    </div>
  );
};

export default About;
