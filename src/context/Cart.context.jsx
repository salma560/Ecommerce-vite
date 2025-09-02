import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import { toast } from "react-toastify";
export const cartContext = createContext(null);

export default function CartProvider({ children }) {
  const { token } = useContext(UserContext);
  const [cartProducts, setcartProducts] = useState(null);

  async function addProductToCart(productId) {
    const toastid = toast.loading("we try to add Product to your Cart");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId,
        },
      };
      const { data } = await axios.request(options);
      if (data.status == "success") {
        toast.update(toastid, {
          render: "Product added Successfully",
          type: "success",
          isLoading: false,
          autoClose: 1000,
          closeOnClick: true,
          pauseOnHover: false,
        });
      }
      console.log(data);
      getProductsFromCart();
    } catch (error) {
      toast.update(toastid, {
        render: error || "try Again!!",
        type: "error",
        isLoading: false,
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
  }

  async function getProductsFromCart() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      setcartProducts(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeSpecificItem(ProductID) {
    const toastid = toast.loading("wait !!");

    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${ProductID}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
       toast.update(toastid, {
          render: "Product removed Successfully",
          type: "success",
          isLoading: false,
          autoClose: 1000,
          closeOnClick: true,
          pauseOnHover: false,
        });
      setcartProducts(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function cleaCart() {
    const toastid = toast.loading("Clear Cart...");

    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      console.log(data);
      if (data.message == "success") {
        toast.update(toastid, {
          render: "cart has been cleared",
          type: "success",
          isLoading: false,
          autoClose: 1000,
          closeOnClick: true,
          pauseOnHover: false,
        });
        setcartProducts({
          numOfCartItems: 0,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateProductCount(productId, count) {
    const toastid = toast.loading("wait...");

    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "PUT",
        headers: {
          token,
        },
        data: {
          count,
        },
      };
      const { data } = await axios.request(options);
      console.log(data);
      if (data.status == "success") {
        toast.update(toastid, {
          render: "done",
          type: "success",
          isLoading: false,
          autoClose: 1000,
          closeOnClick: true,
          pauseOnHover: false,
        });
        setcartProducts(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <cartContext.Provider
      value={{
        addProductToCart,
        getProductsFromCart,
        cartProducts,
        removeSpecificItem,
        cleaCart,
        updateProductCount,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
