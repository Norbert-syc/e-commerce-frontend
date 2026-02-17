import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, ShoppingCart, User, LogOut, Package } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";

const MainHeader = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { cartCount } = useCart();

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
          <button type="submit"><Search size={16} /></button>
        </form>

        <div className="header-actions">
          {isAuthenticated ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div><User size={16} /> HELLO, {user?.name.toUpperCase()}</div>
              <button 
                onClick={logout}
                style={{ 
                  background: "none", 
                  border: "none", 
                  color: "inherit", 
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px"
                }}
              >
                <LogOut size={16} /> LOGOUT
              </button>
            </div>
          ) : (
            <Link
              to="/signin"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div><User size={16} /> HELLO, SIGN IN</div>
            </Link>
          )}
          <Link to="/orders" style={{ textDecoration: "none", color: "inherit" }}>
            <div>
              <Package size={16} /> Orders
            </div>
          </Link>
          <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
            <div>
              <ShoppingCart size={16} /> Cart {cartCount > 0 ? `(${cartCount})` : "$0.00"}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
