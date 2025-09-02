import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import { toast } from "react-toastify";

export const wishlistContext = createContext(null);

export default function WishlistProvider({ children }) {
  const { token } = useContext(UserContext);
  const [wishlist, setWishlist] = useState(null);

  async function addProductToWishlist(productId) {
    if (!token) return;
    const toastid = toast.loading("Adding product to your wishlist...");

    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers: { token } }
      );

      if (data.status === "success") {
        toast.update(toastid, {
          render: data.message,
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
        await getProductsFromWishlist(); // تحديث فعلي
      }
    } catch (error) {
      toast.update(toastid, {
        render: "Failed to add product ❌",
        type: "error",
        isLoading: false,
        autoClose: 1500,
      });
      console.log("❌ Error adding to wishlist", error);
    }
  }

  async function getProductsFromWishlist() {
    if (!token) return;
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers: { token } }
      );
      setWishlist(data.data);
    } catch (error) {
      console.log("❌ Error loading wishlist", error);
    }
  }

  async function removeFromWishlist(productId) {
    if (!token) return;
    const toastid = toast.loading("Removing product from your wishlist...");

    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers: { token } }
      );

      if (data.status === "success") {
        toast.update(toastid, {
          render: data.message || "Removed from wishlist 💔",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });

        await getProductsFromWishlist(); // تحديث البيانات
      }
    } catch (error) {
      toast.update(toastid, {
        render: "Failed to remove product ❌",
        type: "error",
        isLoading: false,
        autoClose: 1500,
      });
      console.log("❌ Error removing from wishlist", error);
    }
  }

  return (
    <wishlistContext.Provider
      value={{
        addProductToWishlist,
        getProductsFromWishlist,
        wishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
}
