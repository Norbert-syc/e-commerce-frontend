import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import Orders from "./pages/Orders";
import Footer from "./components/Footer";
import "./App.css";
import TopBar from "./components/header/TopBar";
import SignUp from "./pages/SignUp";
import Dashboard from "./admin/pages/Dashboard";
import CategoriesPage from "./admin/pages/CategoriesPage";
import ProductsPage from "./admin/pages/ProductsPage";
import AdminLogin from "./admin/pages/AdminLogin";
import CartsPage from "./admin/pages/CartsPage";
import OrdersPage from "./admin/pages/OrdersPage";
import ProtectedRoute from "./admin/components/ProtectedRoute";

function AppContent() {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && (
        <>
          <TopBar />
          <Header />
          <MainHeader />
          <NavBar />
        </>
      )}
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
        <Route path="/orders" element={<Orders />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/categories" element={<ProtectedRoute><CategoriesPage /></ProtectedRoute>} />
        <Route path="/admin/products" element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
        <Route path="/admin/carts" element={<ProtectedRoute><CartsPage /></ProtectedRoute>} />
        <Route path="/admin/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
