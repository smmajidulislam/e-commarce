import { useState } from "react";
import Image from "next/image";

export default function ProductCard({ product }) {
  const [showFullDesc, setShowFullDesc] = useState(false);

  // Title truncate by characters
  const maxTitleChars = 10;
  const displayTitle =
    product.title.length > maxTitleChars
      ? product.title.slice(0, maxTitleChars) + "..."
      : product.title;

  // Description truncate by characters
  const maxDescChars = 20;
  const displayDesc =
    product.description.length > maxDescChars
      ? product.description.slice(0, maxDescChars) + "..."
      : product.description;

  return (
    <div className="w-full sm:w-1/1 md:w-1/3 lg:w-1/5 xl:w-1/6 flex items-center justify-center lg:my-2 border border-gray-200 rounded-2xl ">
      <div className="card bg-base-100 w-96 shadow-sm m-2 cursor-pointer font-inter flex flex-col">
        <figure>
          <Image
            src={
              product.image ||
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            }
            alt={product.title}
            width={400}
            height={600}
            className="rounded-2xl object-cover"
          />
        </figure>
        <div className="card-body p-2 flex flex-col flex-grow ">
          <h2 className="card-title mt-2 text-md font-semibold">
            {displayTitle}
          </h2>

          <p className="text-sm flex-grow">
            {showFullDesc ? product.description : displayDesc}
            {product.description.length > maxDescChars && (
              <button
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="ml-2 text-blue-600 hover:underline cursor-pointer text-xs"
              >
                {showFullDesc ? "See Less" : "See More"}
              </button>
            )}
          </p>

          <div className="card-actions justify-center items-center mt-2 flex">
            <div className="w-full text-center rounded-full border bg-gray-500 px-3 py-2 text-sm font-medium text-black transition-all duration-300 hover:bg-pink-600 hover:text-white cursor-pointer shadow-sm">
              Add to cart
            </div>
          </div>

          <div className="badge badge-secondary mb-2 text-sm mt-2">
            Rate: {product.price}$ <span className="ml-2">{product.stock}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
