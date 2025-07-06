"use client";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsQuery } from "@/app/features/product/productApi";
import { setPage } from "@/app/features/category/categorySlice";
import SingelProducts from "./SingelProducts";

const SkeletonProductCard = () => {
  return (
    <div className="w-64 h-80 rounded-2xl shadow-lg animate-pulse bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200" />
  );
};

const ProductsList = () => {
  const dispatch = useDispatch();
  const { selectedCategory, page, limit } = useSelector(
    (state) => state.category
  );

  const { data, isLoading, error } = useGetProductsQuery({
    category: selectedCategory,
    page,
    limit,
  });

  const totalPages = data?.pagination?.totalPages || 1;

  const goToPage = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPages) return;
    dispatch(setPage(pageNum));
  };

  return (
    <>
      <div
        className={`flex flex-wrap justify-center ${
          isLoading && "gap-4"
        }  py-6  rounded-3xl bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 shadow-md`}
      >
        {isLoading &&
          [...Array(6)].map((_, idx) => <SkeletonProductCard key={idx} />)}

        {error && (
          <p className="w-full text-center text-red-600 text-lg font-semibold">
            ❌ Failed to load products.
          </p>
        )}

        {!isLoading && data?.data?.length === 0 && (
          <p className="w-full text-center text-gray-600 text-lg font-semibold">
            No products found.
          </p>
        )}

        {!isLoading &&
          data?.data?.map((product) => (
            <SingelProducts key={product._id} product={product} />
          ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8 mb-4">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
              page === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                  page === pageNum
                    ? "bg-pink-600 text-white shadow-lg"
                    : "bg-white border border-purple-300 text-purple-700 hover:bg-purple-100"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
              page === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default ProductsList;
