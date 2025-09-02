import React, { useContext, useEffect } from "react";
import { wishlistContext } from "../../context/Wishlist.context";
import { cartContext } from "../../context/Cart.context";
import Loading from "../../Components/Loading/Loading";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { getProductsFromWishlist, wishlist, removeFromWishlist } =
    useContext(wishlistContext);

  const { addProductToCart } = useContext(cartContext);

  useEffect(() => {
    getProductsFromWishlist();
  }, []);

  if (!wishlist) {
    return <Loading />;
  }
  if (wishlist.length === 0) {
 return (
      <section className="py-10 px-4">
        <div className="flex-center flex-col bg-slate-100 text-myColor-900 p-10 rounded-xl shadow space-y-6 text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 rounded-full border-2 border-myColor-700 flex-center text-3xl text-myColor-700 hover:text-white hover:bg-myColor-700 transition-all duration-300">
            <i className="fa-solid fa-heart"></i>
          </div>

          <p className="text-xl font-medium leading-relaxed">
            Looks like you haven't added anything to your Wishlist yet.
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
      <div className="wishlist px-4 py-10">
        <header className="text-myColor-700 flex-center flex-col text-center text-5xl">
          <i className="fa-solid fa-heart"></i>
          <h1 className="font-bold text-3xl mt-3">My Wishlist</h1>
        </header>

        <main className="my-6 overflow-x-auto">
          <table className="w-full text-center border">
            <thead>
              <tr className="bg-myColor-800 text-white">
                <th className="p-3 border">Product Name</th>
                <th className="p-3 border">Category</th>
                <th className="p-3 border">Price</th>
                <th className="p-3 border">Add To Cart</th>
                <th className="p-3 border">Remove</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((product) => (
                <tr
                  key={product._id}
                  className="border-b text-myColor-700 font-semibold text-lg hover:bg-gray-100"
                >
                  <td className="p-3 border">
                    <div className="flex items-center justify-center gap-4">
                      <img
                        src={product.imageCover}
                        alt={product.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                      {product.title}
                    </div>
                  </td>
                  <td className="p-3 border">{product.category?.name}</td>
                  <td className="p-3 border">{product.price} L.E</td>
                  <td className="p-3 border">
                    <button
                      onClick={() => addProductToCart(product._id)}
                      className="bg-myColor-700 text-white px-3 py-1 rounded hover:bg-myColor-900 transition"
                    >
                      <i className="fa-solid fa-cart-plus mr-2"></i> Add
                    </button>
                  </td>
                  <td className="p-3 border">
                    <button
                      onClick={() => removeFromWishlist(product._id)}
                      className="text-myColor-600 hover:text-myColor-800 transition text-xl"
                      title="Remove from wishlist"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
}
