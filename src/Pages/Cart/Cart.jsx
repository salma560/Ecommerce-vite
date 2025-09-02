import React, { useEffect, useContext } from "react";
import CartItem from "../../Components/CartItem/CartItem";
import { cartContext } from "../../context/Cart.context";
import Loading from "../../Components/Loading/Loading";
import { Link } from "react-router-dom";

export default function Cart() {
  const { getProductsFromCart, cartProducts, cleaCart } =
    useContext(cartContext);

  useEffect(() => {
    getProductsFromCart();
  }, []);

  if (!cartProducts) {
    return <Loading />;
  }

  if (cartProducts.numOfCartItems === 0) {
    return (
      <section className="py-10 px-4">
        <div className="flex-center flex-col bg-slate-100 text-myColor-900 p-10 rounded-xl shadow space-y-6 text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 rounded-full border-2 border-myColor-700 flex-center text-3xl text-myColor-700 hover:text-white hover:bg-myColor-700 transition-all duration-300">
            <i className="fa-solid fa-cart-shopping"></i>
          </div>

          <p className="text-xl font-medium leading-relaxed">
            Looks like you haven't added anything to your cart yet.
            <br className="hidden sm:block" />
            Go ahead and explore our top products!
          </p>

          <Link
            to="/products"
            className="btn bg-myColor-600 hover:bg-myColor-800 text-white font-semibold px-6 py-3 rounded-md transition-all duration-300"
          >
            Browse Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <header className=" flex items-center p-4">
        <span className="text-2xl font-semibold ">
          <i className="fa-brands fa-opencart"></i>
        </span>
        <h1 className="text-xl ml-7 relative pl-4 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[2px] before:h-5 before:bg-gray-700">
          Your Shopping Cart
        </h1>
      </header>

      <div className="cart-items space-y-4 p-4">
        {cartProducts.data.products.map((product) => (
          <CartItem key={product._id} products={product} />
        ))}
        <div className="footer flex justify-between items-center pt-5">
          <div className="totalCartPtice">
            <h4 className="text-lg font-semibold">
              <i className="text-myColor-600 fa-solid fa-dollar-sign"></i> Your
              Total Cart Price Is :{" "}
              <span className="text-myColor-600">
                {cartProducts.data.totalCartPrice}
              </span>
            </h4>
          </div>
          <div className="clearCart">
            <button
              onClick={cleaCart}
              className="btn bg-red-600 hover:bg-transparent hover:border hover:text-black hover:border-red-600"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>

      <Link
        to="/checkout"
        className="btn inline-block text-center w-full bg-myColor-700 font-semibold text-white hover:bg-myColor-900"
      >
        {" "}
        Complete the purchase{" "}
      </Link>
    </>
  );
}
