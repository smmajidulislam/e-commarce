"use client";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { usePayment } from "../hooks/usePayment";
import { useCreatePaymentStripeMutation } from "../features/payment/paymentApiSlice";

const Page = () => {
  const { paymentData } = usePayment();
  const [createPayment, { data, isLoading, isSuccess }] =
    useCreatePaymentStripeMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (paymentData) {
      reset({
        totalAmount: paymentData?.totalAmount,
        address: paymentData?.deliveryAddress,
      });
    }
  }, [paymentData, reset]);

  const onSubmit = async (d) => {
    const preparedData = {
      user: paymentData?.user,
      total_amount: parseFloat(d?.totalAmount),
      ship_add1: d?.address,
      products: paymentData?.products,
      id: paymentData?._id,
    };

    const res = await createPayment(preparedData).unwrap();
    try {
      if (res?.url) {
        window.location.href = res.url;
      }
    } catch (err) {
      console.error("Payment creation failed:", err);
    }
  };

  useEffect(() => {
    if (isSuccess && data?.payment_url) {
      window.location.href = data.payment_url;
    }
  }, [isSuccess, data]);

  return (
    <div className="min-h-full bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 py-14 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl p-8 sm:p-10 text-black">
        <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-8">
          💳 Secure Payment Checkout
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Total Amount */}
          <div>
            <label
              htmlFor="totalAmount"
              className="block mb-2 font-medium text-gray-800"
            >
              💰 Total Amount (BDT)
            </label>
            <input
              id="totalAmount"
              type="number"
              readOnly
              {...register("totalAmount", {
                required: "Total amount is required",
                min: { value: 1, message: "Amount must be at least 1" },
              })}
              className={`w-full px-5 py-3 text-black rounded-xl border ${
                errors.totalAmount
                  ? "border-red-400 bg-red-50"
                  : "border-yellow-300 bg-yellow-50"
              } focus:outline-none focus:ring-2 focus:ring-yellow-400 transition`}
              placeholder="Enter amount"
            />
            {errors.totalAmount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.totalAmount.message}
              </p>
            )}
          </div>

          {/* Shipping Address */}
          <div>
            <label
              htmlFor="address"
              className="block mb-2 font-medium text-gray-800"
            >
              🏠 Shipping Address
            </label>
            <textarea
              id="address"
              {...register("address", {
                required: "Shipping address is required",
              })}
              rows="3"
              className={`w-full px-5 py-3 text-black rounded-xl border ${
                errors.address
                  ? "border-red-400 bg-red-50"
                  : "border-purple-300 bg-purple-50"
              } focus:outline-none focus:ring-2 focus:ring-purple-400 transition`}
              placeholder="Enter shipping address"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-full text-lg font-bold shadow-md transition-transform duration-300 ${
              isLoading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white hover:scale-105"
            }`}
          >
            {isLoading ? "Redirecting..." : "🚀 Proceed to Payment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
