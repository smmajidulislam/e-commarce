"use client";
import { useGetOrdersQuery } from "@/app/features/order/orderApi";
import OrderCard from "./OrderCard";
import { useAuth } from "@/app/hooks/UseAuth";
import { useDispatch, useSelector } from "react-redux"; // ✅ fixed import
import { setPage } from "../../features/category/categorySlice";

export default function Order() {
  const dispatch = useDispatch(); // ✅ dispatch added
  const { token } = useAuth();
  const { page, limit } = useSelector((state) => state.category);

  const { data } = useGetOrdersQuery(
    {
      page,
      limit,
      user: token?._id,
    },
    {
      skip: !token,
      refetchOnMountOrArgChange: true,
    }
  );

  const orders = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const goToPage = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPages) return;
    dispatch(setPage(pageNum));
  };

  return (
    <div className="min-h-full bg-gray-50 p-6">
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}

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
    </div>
  );
}
