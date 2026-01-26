import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

interface MainHeaderProps {
  cartItemsCount?: number;
  onAddToCart?: (item: any) => void;
}

const MainHeader = ({ cartItemsCount = 0 }: MainHeaderProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  return (
    <div className="main-header">
      <div className="main-header-inner">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="logo">kapee.</div>
        </Link>

        <form className="search-bar" onSubmit={handleSearch}>
          <input
            placeholder="Search for products, categories, brands..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select>
            <option>All Categories</option>
            <option>Men</option>
            <option>Women</option>
            <option>Shoes</option>
            <option>Watches</option>
            <option>Jewellery</option>
            <option>Accessories</option>
            <option>Dresses</option>
            <option>Tops</option>
            <option>Bags & Backpacks</option>
            <option>Lingerie & Nightwear</option>
          </select>
          <button type="submit">🔍</button>
        </form>

        <div className="header-actions">
          <Link
            to="/signin"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div>👤 HELLO, SIGN IN</div>
          </Link>
          <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
            <div>
              🛒 Cart {cartItemsCount > 0 ? `(${cartItemsCount})` : "$0.00"}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
