import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Layout from "./Components/Layout/Layout";
import Signup from "./Pages/Signup/Signup";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Login from "./Pages/Login/Login";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import GuestRoute from "./Components/GuestRoute/GuestRoute";
import UserProvider from "./context/User.context";
import CartProvider from "./context/Cart.context";
import Cart from "./Pages/Cart/Cart";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Checkout from "./Pages/CheckOut/Checkout";
import Orders from "./Pages/Orders/Orders";
import Products from "./Pages/Products/Products";
import Categories from "./Pages/Categories/Categories";
import Brands from "./Pages/Brands/Brands";
import CategoryDetails from "./Pages/CategoryDetails/CategoryDetails";
import NotFound from "./Pages/NotFound/NotFound";
import Offline from "./Components/Offline/Offline";
import BrandDetails from "./Pages/BrandDetails/BrandDetails";
import WishlistProvider from "./context/Wishlist.context";
import Wishlist from "./Pages/Wishlist/Wishlist";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "/products", element: <Products /> },
        { path: "/categories", element: <Categories /> },
        { path: "/brands", element: <Brands /> },
        { path: "/allorders", element: <Orders /> },
        { path: "/cart", element: <Cart /> },
        { path: "/wishlist", element: <Wishlist /> },
        { path: "/productDetails/:id", element: <ProductDetails /> },
        { path: "/categoryDetails/:id", element: <CategoryDetails /> },
        { path: "/brand/:id", element: <BrandDetails /> },
        { path: "/checkout", element: <Checkout /> },
        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "/",
      element: (
        <GuestRoute>
          <Layout />
        </GuestRoute>
      ),
      children: [
        { path: "/signup", element: <Signup /> },
        { path: "/login", element: <Login /> },
      ],
    },
  ]);
  return (
    <>
      <UserProvider>
        <WishlistProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </WishlistProvider>
      </UserProvider>

      <ToastContainer />

      <Offline>
        <div className="fixed bottom-5 right-5  bg-black bg-opacity-60 font-semibold text-white text-center px-2 py-2 z-50 shadow-lg">
          <i className="fa-solid fa-wifi text-red-600"></i> No Internet
          Connection. Please check your network.
        </div>
      </Offline>
    </>
  );
}

export default App;
