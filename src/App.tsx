import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/header/Header";
import MainHeader from "./components/header/MainHeader";
import NavBar from "./components/header/NavBar";
import Hero from "./components/hero/Hero";
import CategoryList from "./components/categoryList";
import FeaturedProducts from "./components/productList";
import AllProducts from "./components/AllProducts";
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

function App() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);

  return (
    <Router>
      <TopBar />
      <Header />
      <MainHeader
        cartItemsCount={cartItems.length}
        onAddToCart={(item) => setCartItems([...cartItems, item])}
      />
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
        <Route path="/shop" element={<AllProducts />} />
        <Route
          path="/product/:id"
          element={
            <ProductDetails
              onAddToCart={(item) => setCartItems([...cartItems, item])}
            />
          }
        />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/category/:category" element={<AllProducts />} />
        <Route
          path="/cart"
          element={<Cart items={cartItems} setItems={setCartItems} />}
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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
