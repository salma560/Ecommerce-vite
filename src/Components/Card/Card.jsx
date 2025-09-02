import React, { useContext } from "react";
import { cartContext } from "../../context/Cart.context";
import { Link, Links } from "react-router-dom";
import { wishlistContext } from "../../context/Wishlist.context";

export default function Card({ product }) {
  const { title, description, price, imageCover, category, ratingsAverage } =
    product;
  const { addProductToCart } = useContext(cartContext);
  const {addProductToWishlist}=useContext(wishlistContext)
  return (
    <>
      <div className="cart group p-3 shadow-sm">
        <div className="img relative ">
          <img src={imageCover} alt={title} className="w-full" />
          <div className="imgLayer absolute group-hover:opacity-100 transition-all duration-300 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 flex-center gap-x-2 opacity-0">
            <span
            onClick={()=>{addProductToWishlist(product._id)}}
            className="w-8 cursor-pointer hover:rotate-45 transition-all duration-200 h-8 bg-myColor-600 text-white rounded-full flex-center">
              <i className="fa-solid fa-heart"></i>
            </span>
            <span
              onClick={() => addProductToCart(product._id)}
              className="w-8 cursor-pointer hover:rotate-45 transition-all duration-200 h-8 bg-myColor-600 text-white rounded-full flex-center"
            >
              <i className="fa-solid fa-cart-shopping"></i>
            </span>
            <Link
              to={`/ProductDetails/${product._id}`}
              className="w-8 cursor-pointer hover:rotate-45 transition-all duration-200 h-8 bg-myColor-600 text-white rounded-full flex-center"
            >
              <i className="fa-solid fa-eye"></i>
            </Link>
          </div>
        </div>
        <div className="cart-body">
          <h3 className="text-myColor-800 font-semibold">{category.name}</h3>
          <Link
            to={`/ProductDetails/${product._id}`}
            className="font-semibold line-clamp-1"
          >
            {title}
          </Link>
          <p className="line-clamp-2 text-slate-400">{description}</p>
        </div>
        <div className="card-footer flex justify-between items-center mt-3 border-t-2 border-slate-300 p-2 ">
          <div className="price">
            <h5>{price} EGP</h5>
          </div>
          <div className="rating">
            <i className="fa-solid fa-star text-yellow-300"></i>
            <span>{ratingsAverage}</span>
          </div>
        </div>
      </div>
    </>
  );
}
