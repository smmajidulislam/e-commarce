"use client";
import { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../../../features/wishlishtSlice/wishlist";
import Link from "next/link";

export default function AdminSingleProducts({ product }) {
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
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/5 flex justify-center p-2">
      <div className="bg-gradient-to-br from-[#fce4ec] via-[#f3e5f5] to-[#e3f2fd] w-full rounded-2xl shadow-lg p-3 flex flex-col h-full">
        {/* Image */}
        <figure className="relative w-full h-36 overflow-hidden rounded-xl mb-3">
          <Image
            src={
              product?.image ||
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            }
            alt={product.title}
            width={400}
            height={400}
            className="object-cover w-full h-full"
          />
        </figure>

        {/* Content */}
        <div className="flex flex-col flex-grow">
          <Link href={`/admin/products/allProducts/${product._id}`}>
            <h2 className="text-md font-semibold text-purple-800">
              {displayTitle}
            </h2>

            <p className="text-sm text-gray-700 leading-tight mt-1">
              {showFullDesc ? product.description : displayDesc}
              {product.description.length > maxDescChars && (
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowFullDesc(!showFullDesc);
                  }}
                  className="ml-1 text-blue-600 font-medium hover:underline text-xs cursor-pointer"
                >
                  {showFullDesc ? "See Less" : "See More"}
                </span>
              )}
            </p>
          </Link>

          {/* Push down the price, stock and button */}
          <div className="mt-auto flex flex-col gap-3 pt-4">
            {/* Price and Stock */}
            <div className="flex items-center justify-between">
              <span className="bg-pink-100 text-pink-700 text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap">
                💲 {product.price}
              </span>
              <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap">
                📦 {product.stock}
              </span>
            </div>

            {/* Wishlist Button */}
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
