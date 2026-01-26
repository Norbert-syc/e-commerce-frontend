import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="nav-bar">
      <div className="nav-bar-inner">
        <div className="departments">☰ SHOP BY DEPARTMENT</div>

        <ul className="nav-links">
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/shop">SHOP</Link>
          </li>
          <li>PAGES</li>
          <li>BLOG</li>
          <li>ELEMENTS</li>
          <li className="highlight">BUY NOW</li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
