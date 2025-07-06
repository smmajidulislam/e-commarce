"use client";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import Skeleton from "../../components/skeliton/SingelProductSkeliton";
import { useGetProductByIdQuery } from "@/app/features/product/productApi";
import { addToWishlist } from "@/app/features/wishlishtSlice/wishlist";
import { setProductLayout } from "@/app/features/productLayout/productLayout";
import Image from "next/image";
import { useEffect } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data, isLoading } = useGetProductByIdQuery(id, {
    skip: !id,
  });
  const product = data?.data;

  useEffect(() => {
    dispatch(setProductLayout(false));
    return () => dispatch(setProductLayout(true));
  }, [dispatch]);

  if (isLoading) return <Skeleton />;

  return (
    <div className="min-h-screen bg-[#e0f7fa] dark:bg-[#004d40] text-[#004d40] dark:text-[#e0f7fa] p-4 md:p-8 lg:p-12 rounded-2xl">
      <div className="max-w-6xl mx-auto bg-[#fbe9e7] dark:bg-[#00695c] rounded-2xl shadow-lg p-6 md:p-10 h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {product?.image && (
            <div className="w-full relative h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden bg-[#ffe0b2] dark:bg-[#004d40]">
              <Image
                src={product?.image}
                alt={product?.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div>
            <h1 className="text-3xl font-bold mb-4 text-[#d84315] dark:text-[#ffab91]">
              {product?.title}
            </h1>
            <p className="text-lg mb-2">{product?.description}</p>
            <p
              className={`font-semibold mb-2 ${
                product.stock === "In Stock" ? "text-green-600" : "text-red-600"
              }`}
            >
              {product?.stock}
            </p>
            <p className="text-xl font-bold text-[#6a1b9a] dark:text-[#ce93d8] mb-4">
              ${product?.price}
            </p>
            <button
              onClick={() => dispatch(addToWishlist(product))}
              className="bg-[#ff6f00] hover:bg-[#ff8f00] text-white px-6 py-2 rounded-xl transition"
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
