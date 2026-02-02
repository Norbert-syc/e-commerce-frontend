import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import Header from "./components/header/Header";
import MainHeader from "./components/header/MainHeader";
import NavBar from "./components/header/NavBar";
import Hero from "./components/hero/Hero";
import CategoryList from "./components/categoryList";
import FeaturedProducts from "./components/productList";
import Shop from "./components/Shop";
import ProductDetails from "./pages/ProductDetails";
import SearchResults from "./pages/SearchResults";
import Cart from "./pages/Cart";
import SignIn from "./pages/SignIn";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Footer from "./components/Footer";
import "./App.css";
import TopBar from "./components/header/TopBar";
import SignUp from "./pages/SignUp";

function App() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
      <TopBar />
      <Header />
      <MainHeader />
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="main-content">
              <Hero />
              <CategoryList />
              <FeaturedProducts />
            </div>
          }
        />
        <Route path="/shop" element={<Shop />} />
        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/category/:category" element={<Shop />} />
        <Route
          path="/cart"
          element={<Cart />}
        />
        <Route
          path="/wishlist"
          element={
            <Wishlist items={wishlistItems} setItems={setWishlistItems} />
          }
        />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
