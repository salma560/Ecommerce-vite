import React, { useContext, useState } from "react";
import playStation from "../../assets/imgs/playstation.jpeg";
import { cartContext } from "../../context/Cart.context";
export default function CartItem({ products }) {
  const { count, price, product } = products;
  const { removeSpecificItem } = useContext(cartContext);
  const { updateProductCount } = useContext(cartContext);
  return (
    <>
      <div className="cart-item flex-center gap-2 my-3 ">
        <div className="products-Info flex justify-between items-center grow  p-3">
          <div className="image-cart w-16 h-16 rounded-full flex-center ">
            <img
              src={product.imageCover}
              alt={product.title}
              className="w-full"
            />
          </div>
          <h2 className="text-xl font-semibold text-slate-600">
            {product.title.split(" ").slice(0, 2).join(" ")}
          </h2>
          <h3 className="text-lg  text-myColor-700">{product.category.name}</h3>
          <div className="count">
            <div
            onClick={()=>updateProductCount(product._id,count+1)}
            className="plus cursor-pointer">
              <i className="fa-solid fa-plus"></i>
            </div>
            <div className="count-number font-semibold text-lg ">{count}</div>
            <div 
            onClick={()=>updateProductCount(product._id,count-1)}
            className="minus cursor-pointer">
              <i className="fa-solid fa-minus"></i>
            </div>
          </div>
          <h4 className="price text-lg font-semibold text-slate-500">
            {price} L.E
          </h4>
        </div>
        <div className="deleteIcon cursor-pointer py-8 px-2">
          <div
            onClick={() => removeSpecificItem(product._id)}
            className="delete  text-red-600 p-1"
          >
            <i className="fa-solid fa-x"></i>
          </div>
        </div>
      </div>
    </>
  );
}
