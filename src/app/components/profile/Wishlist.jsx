"use client";
import Image from "next/image";
import { useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromWishlist,
} from "../../features/wishlishtSlice/wishlist";

const Wishlist = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="w-full max-w-5xl mx-auto bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 rounded-3xl shadow-lg border border-purple-200 p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start mb-8 transition hover:shadow-xl duration-300">
      {/* Product Image */}
      <div className="relative w-full sm:w-48 h-48 md:h-40 rounded-xl overflow-hidden shadow-md ring-2 ring-pink-300">
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

      {/* Info Section */}
      <div className="flex-1 w-full space-y-4 text-center md:text-left">
        <h2 className="text-2xl font-bold text-purple-700">{product?.title}</h2>
        <p className="text-sm text-gray-600">{product.description}</p>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <span className="bg-purple-100 px-3 py-1 rounded-full font-medium">
            Unit Price: ${product?.price}
          </span>
          <span className="bg-yellow-100 px-3 py-1 rounded-full font-medium">
            Stock: {product?.stock}
          </span>
        </div>

        {/* Quantity Control */}
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
        <p className="text-xl font-bold text-blue-600 mt-3">
          Total: ${product?.totalPrice.toFixed(2)}
        </p>

        {/* Remove Button */}
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

export default Wishlist;
