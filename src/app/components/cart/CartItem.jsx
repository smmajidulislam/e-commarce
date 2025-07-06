"use client";
import Image from "next/image";
import { useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromWishlist,
} from "../../features/wishlishtSlice/wishlist";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-md p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 border border-pink-200 mb-6">
      <div className="relative w-full sm:w-44 h-44 rounded-xl overflow-hidden shadow ring-2 ring-pink-300">
        <Image
          src={
            product?.image ||
            "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          }
          alt={product?.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 space-y-3 text-center md:text-left">
        <h2 className="text-xl font-bold text-purple-700">{product?.title}</h2>
        <p className="text-gray-600 text-sm">{product?.description}</p>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <span className="text-sm bg-purple-100 text-black px-3 py-1 rounded-full font-medium">
            Price: ${product?.price}
          </span>
          <span className="text-sm text-black bg-yellow-100 px-3 py-1 rounded-full font-medium">
            Quantity: {product?.quantity}
          </span>
        </div>

        {/* Quantity control buttons */}
        <div className="flex items-center gap-3 justify-center md:justify-start mt-2">
          <span className="text-sm font-medium text-gray-800">Quantity:</span>
          <div className="flex items-center bg-white border rounded-xl overflow-hidden shadow-sm">
            <button
              onClick={() => dispatch(decreaseQuantity(product._id))}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-lg font-bold"
            >
              −
            </button>
            <span className="px-5 font-medium">{product?.quantity}</span>
            <button
              onClick={() => dispatch(increaseQuantity(product._id))}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-lg font-bold"
            >
              +
            </button>
          </div>
        </div>

        {/* Total Price */}
        <p className="text-blue-600 text-lg font-bold mt-2">
          Total: ${product?.totalPrice.toFixed(2)}
        </p>

        {/* Remove button */}
        <button
          onClick={() => dispatch(removeFromWishlist(product._id))}
          className="mt-4 inline-block px-6 py-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold rounded-full shadow transition-all duration-200"
        >
          ❌ Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
