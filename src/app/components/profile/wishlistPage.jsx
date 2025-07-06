"use client";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../features/wishlishtSlice/wishlist";
import Wishlist from "./Wishlist";
import { setOrderTotalPrice } from "@/app/features/totalPrice/totalPrice";
import { useEffect } from "react";
import Link from "next/link";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist);
  const total = useSelector((state) => state.totalPrice);

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  useEffect(() => {
    dispatch(setOrderTotalPrice(wishlistItems));
  }, [wishlistItems, dispatch]);

  return (
    <div className="min-h-full bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 py-2 px-6 ">
      {wishlistItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          Your wishlist is empty.
        </p>
      ) : (
        wishlistItems.map((item) => (
          <Wishlist key={item._id} product={item} onRemove={handleRemove} />
        ))
      )}

      {wishlistItems.length > 0 && (
        <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-6">
          {/* Total Amount */}
          <div className="bg-white px-6 py-3 rounded-full shadow-md border border-purple-300 text-lg sm:text-2xl text-purple-700 font-semibold transition hover:scale-105 hover:bg-purple-100">
            💰 Total Amount: <span className="font-bold">${total}</span>
          </div>

          {/* Order Button */}
          <Link
            href="/order"
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-6 py-3 rounded-full shadow-lg text-lg sm:text-2xl font-bold transition-transform hover:scale-105 hover:shadow-xl"
          >
            🛒 Order Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
