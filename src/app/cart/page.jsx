"use client";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/cart/CartItem";
import Link from "next/link";
import { useEffect } from "react";
import { setOrderTotalPrice } from "../features/totalPrice/totalPrice";

const CartPage = () => {
  const cartItems = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  useEffect(() => {
    dispatch(setOrderTotalPrice(cartItems));
  }, [totalPrice, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 px-4 sm:px-8 py-6">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
        🛒 Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem key={item._id} product={item} />
          ))}

          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <div className="bg-white border border-purple-300 px-6 py-3 rounded-full shadow text-lg sm:text-xl font-semibold text-purple-700 hover:bg-purple-100 transition">
              💰 Total: ${totalPrice.toFixed(2)}
            </div>
            <Link
              href="/order"
              className="bg-gradient-to-r from-green-500 via-lime-500 to-yellow-500  px-6 py-3 rounded-full shadow-lg text-lg sm:text-xl font-bold transition-transform hover:scale-105 hover:shadow-xl text-black"
            >
              Order Now
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
