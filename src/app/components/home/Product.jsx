"use client";
import { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../../features/wishlishtSlice/wishlist";
import Link from "next/link";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [showFullDesc, setShowFullDesc] = useState(false);

  const maxTitleChars = 20;
  const maxDescChars = 40;

  const displayTitle =
    product.title.length > maxTitleChars
      ? product.title.slice(0, maxTitleChars) + "..."
      : product.title;

  const displayDesc =
    product.description.length > maxDescChars
      ? product.description.slice(0, maxDescChars) + "..."
      : product.description;

  const handleAddToCart = () => {
    dispatch(addToWishlist(product));
  };

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/6 flex justify-center items-stretch ">
      <div className="bg-gradient-to-br from-[#fce4ec] via-[#f3e5f5] to-[#e3f2fd] w-full rounded-2xl shadow-lg p-2 flex flex-col hover:scale-105 transition-transform duration-300 h-full">
        {/* Product Image */}
        <figure className="relative w-full h-36 overflow-hidden rounded-xl">
          <Image
            src={
              product.image ||
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            }
            alt={product.title}
            width={400}
            height={400}
            className="object-cover w-full h-full"
          />
        </figure>

        {/* Card Content */}
        <div className="flex flex-col justify-between flex-grow">
          {/* Title & Description */}
          <div className="mt-3">
            <Link href={`/products/${product._id}`}>
              <h2 className="text-md font-semibold text-purple-800 hover:underline">
                {displayTitle}
              </h2>
            </Link>

            <p className="text-sm text-gray-700 leading-tight mt-1">
              {showFullDesc ? product.description : displayDesc}
              {product.description.length > maxDescChars && (
                <button
                  onClick={() => setShowFullDesc(!showFullDesc)}
                  className="ml-1 text-blue-600 font-medium hover:underline text-xs"
                >
                  {showFullDesc ? "See Less" : "See More"}
                </button>
              )}
            </p>
          </div>

          {/* Price + Stock + Wishlist Button */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="bg-pink-100 text-pink-700 text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap">
                💲 {product.price}
              </span>
              <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap">
                📦 {product.stock}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full text-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 text-sm font-semibold shadow hover:from-pink-600 hover:to-purple-600 transition-all"
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
