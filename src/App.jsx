import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import AppLayout from "./layout/AppLayout";
import CookieServices from "./services/CookieServices";
import Cart from "./pages/Cart";
import ProductsCategory from "./pages/ProductsCategory";

import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardProducts from "./pages/dashboard/DashboardProducts";
import DashboardCategories from "./pages/dashboard/DashboardCategories";
import DashboardReviews from "./pages/dashboard/DashboardReviews";
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout";
import UserProfile from "./pages/UserProfile";
import PageNotFound from "./pages/PageNotFound";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardUsers from "./pages/dashboard/DashboardUsers";
import Popup from "./components/Popup";
import WishlistPage from "./pages/Wishlist";
import DiscountedProducts from "./pages/DiscountedProducts";
import ComparePage from "./pages/Compare";

import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  const token = CookieServices.get("jwt");

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Check login status and show popup if user is not logged in
      setIsOpen(true);
    }, 5000); // Show popup after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    AOS.refresh();
  });

  return (
    <>
      {!token && <Popup isOpen={isOpen} onClose={handleClose} />}
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/products/offers/discounts"
            element={<DiscountedProducts />}
          />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route
            path="products/categories/:category"
            element={<ProductsCategory />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/userProfile" element={<UserProfile />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<DashboardProducts />} />
          <Route path="categories" element={<DashboardCategories />} />
          <Route path="reviews" element={<DashboardReviews />} />
          <Route path="users" element={<DashboardUsers />} />
        </Route>

        <Route path="/Signup" element={<Signup />} />
        <Route path="/login" element={<Login isAuthenticated={token} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
