const TopBar = () => {
  return (
    <div className="topbar">
      <div className="topbar-inner">
        <div className="topbar-left">
          <span>🌍 ENGLISH ▾</span>
          <span>💵 DOLLAR (US) ▾</span>
        </div>

        <div className="topbar-center">
          <span>🏪 WELCOME TO OUR STORE!</span>
          <span>📰 BLOG</span>
          <span>❓ FAQ</span>
          <a href="/contact">📧 CONTACT US</a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
