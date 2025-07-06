"use client";
import { useLazyGetOrderByIdQuery } from "../../features/order/orderApi";
import OrderCard from "./OrderCard";
import { useForm } from "react-hook-form";
import { useState } from "react";

const OrderWithOutAuth = () => {
  const { register, handleSubmit, reset } = useForm();
  const [fetchOrderById] = useLazyGetOrderByIdQuery(); // ✅ Lazy query
  const [filteredOrder, setFilteredOrder] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async ({ orderId }) => {
    if (!orderId) return;

    try {
      setLoading(true);
      const res = await fetchOrderById(orderId).unwrap();
      if (res?.data) {
        setFilteredOrder(res?.data);
        setNotFound(false);
      } else {
        setFilteredOrder(null);
        setNotFound(true);
      }
    } catch (error) {
      setFilteredOrder(null);
      setNotFound(true);
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 p-6">
      {/* ✅ Search Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-6  rounded-full flex flex-col md:flex-row justify-center items-center gap-4"
      >
        <input
          type="text"
          {...register("orderId")}
          placeholder="Enter Order ID"
          className="px-4 py-2 text-black rounded-full border-2 border-purple-300 w-full md:w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="bg-pink-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-pink-700 transition"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* ❌ Not Found */}
      {notFound && (
        <p className="text-red-500 font-semibold text-center mb-4">
          ❌ No order found with this ID.
        </p>
      )}

      {/* ✅ Result */}
      {filteredOrder && <OrderCard order={filteredOrder} />}
    </div>
  );
};

export default OrderWithOutAuth;
