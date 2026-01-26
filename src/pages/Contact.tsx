import { useState } from "react";
import "./InfoPages.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for contacting us! We will get back to you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="info-container main-content">
      <h1>Contact Us</h1>

      <div className="contact-wrapper">
        <section className="contact-info">
          <h2>Get in Touch</h2>
          <div className="info-item">
            <h3>📍 Address</h3>
            <p>
              Kapee. Boutique
              <br />
              123 Fashion Street
              <br />
              New York, NY 10001
            </p>
          </div>
          <div className="info-item">
            <h3>📞 Phone</h3>
            <p>
              1-800-KAPEE-1
              <br />
              (1-800-527-331)
            </p>
          </div>
          <div className="info-item">
            <h3>📧 Email</h3>
            <p>
              support@kapee.com
              <br />
              sales@kapee.com
            </p>
          </div>
          <div className="info-item">
            <h3>🕐 Hours</h3>
            <p>
              Monday - Friday: 9am - 6pm EST
              <br />
              Saturday: 10am - 4pm EST
              <br />
              Sunday: Closed
            </p>
          </div>
        </section>

        <section className="contact-form">
          <h2>Send us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="Your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                placeholder="Your message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Contact;
