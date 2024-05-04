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
import FavoritePage from "./pages/Favorite";
import UserProfile from "./pages/UserProfile";
import PageNotFound from "./pages/PageNotFound";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardUsers from "./pages/dashboard/DashboardUsers";

const App = () => {
  const token = CookieServices.get("jwt");

  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route
            path="products/categories/:category"
            element={<ProductsCategory />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorite" element={<FavoritePage />} />
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
