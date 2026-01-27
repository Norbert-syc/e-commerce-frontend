import { Globe, DollarSign, Store, Newspaper, HelpCircle, Mail } from "lucide-react";

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="topbar-inner">
        <div className="topbar-left">
          <span><Globe size={14} /> ENGLISH ▾</span>
          <span><DollarSign size={14} /> DOLLAR (US) ▾</span>
        </div>

        <div className="topbar-center">
          <span><Store size={14} /> WELCOME TO OUR STORE!</span>
          <span><Newspaper size={14} /> BLOG</span>
          <span><HelpCircle size={14} /> FAQ</span>
          <a href="/contact"><Mail size={14} /> CONTACT US</a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
