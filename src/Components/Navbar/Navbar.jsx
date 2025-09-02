import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/imgs/freshcart-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/User.context";
import { cartContext } from "../../context/Cart.context";
import { wishlistContext } from "../../context/Wishlist.context";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, token } = useContext(UserContext);
  const { cartProducts, getProductsFromCart } = useContext(cartContext);
  const { wishlist, getProductsFromWishlist } = useContext(wishlistContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getProductsFromCart();
      getProductsFromWishlist();
    }
  }, []);

  const navClasses = ({ isActive }) =>
    `block py-2 px-2 rounded-md transition-all duration-200 ${
      isActive
        ? "text-green-600 font-semibold underline underline-offset-4"
        : "text-gray-700 hover:text-green-600 hover:font-medium"
    }`;

  const BadgeIcon = ({ to, icon, count }) => (
    <div className="relative text-xl text-gray-700 cursor-pointer">
      <NavLink to={to}>
        <i className={`fa-solid ${icon}`}></i>
      </NavLink>
      <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
        {count != null ? (
          count
        ) : (
          <i className="fa-solid fa-spinner fa-spin text-[10px]"></i>
        )}
      </span>
    </div>
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/categories", label: "Categories" },
    { to: "/brands", label: "Brands" },
    { to: "/allorders", label: "Orders" },
    {
      to: "/wishlist",
      label: (
        <>
          <i className="fa-solid fa-heart mr-2" />
          Wishlist
        </>
      ),
    },
    {
      to: "/cart",
      label: (
        <>
          <i className="fa-solid fa-cart-shopping mr-2" />
          Cart
        </>
      ),
    },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white border-b shadow-sm px-4 py-3 container fixed z-50 left-0 right-0 top-0">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center gap-2 text-green-600 font-bold text-xl"
          >
            <img src={logo} alt="FreshCart" className="h-6" />
          </NavLink>

          {/* Mobile Right Section */}
          {token && (
            <div className="flex items-center gap-4 md:hidden">
              <BadgeIcon
                to="/wishlist"
                icon="fa-heart"
                count={wishlist?.length}
              />
              <BadgeIcon
                to="/cart"
                icon="fa-cart-shopping"
                count={cartProducts?.numOfCartItems}
              />
              <button
                onClick={() => setIsOpen(true)}
                className="p-2 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-100"
              >
                <i className="fa-solid fa-bars"></i>
              </button>
            </div>
          )}

          {/* Desktop Menu */}
          {token && (
            <div className="linksSide hidden md:flex gap-4 items-center">
              {navLinks.map(({ to, label }) => (
                <NavLink key={to} to={to} className={navClasses}>
                  {label}
                </NavLink>
              ))}
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-green-600 hover:font-medium py-2 px-2 rounded-md transition-all duration-200"
              >
                <i className="fa-solid fa-right-from-bracket mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar (Mobile) */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="fixed top-0 left-0 w-64 h-full bg-white z-50 shadow-lg p-6 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-700">Menu</span>
              <button onClick={() => setIsOpen(false)}>
                <i className="fa-solid fa-xmark text-gray-700 text-xl"></i>
              </button>
            </div>

            <div className="linksSide flex flex-col">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `${navClasses({ isActive })} mb-2`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="text-left text-gray-700 hover:text-green-600 hover:font-medium py-2 px-2 rounded-md transition-all duration-200"
              >
                <i className="fa-solid fa-right-from-bracket mr-2"></i> Logout
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
