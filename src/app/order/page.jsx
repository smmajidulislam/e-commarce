"use client";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/UseAuth";
import { useSelector } from "react-redux";
import { useCreateOrderMutation } from "../features/order/orderApi";
import { useRouter } from "next/navigation";
import { usePayment } from "../hooks/usePayment";

const Page = () => {
  const { token } = useAuth();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const wishlistItems = useSelector((state) => state.wishlist);
  const total = useSelector((state) => state.totalPrice);
  const router = useRouter();
  const { savePaymentData } = usePayment();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      address: "",
      email: "",
      amount: total,
    },
  });

  const onSubmit = async (d) => {
    const preparedData = {
      user: token?._id,
      products: wishlistItems.map((item) => ({
        product: item._id,
        quantity: parseInt(item.quantity),
      })),
      totalAmount: total,
      deliveryAddress: d?.address,
      email: d?.email,
    };

    try {
      const res = await createOrder(preparedData).unwrap();
      if (res?.success) {
        savePaymentData(res?.data);
        router.push("/pay");
      }
    } catch (err) {
      console.error("Order creation failed:", err);
    }
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl p-8 sm:p-10">
        <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-8">
          💳 Checkout & Billing
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Address Field */}
          <div>
            <label
              htmlFor="address"
              className="block mb-2 text-md font-medium text-gray-700"
            >
              🏠 Delivery Address
            </label>
            <input
              id="address"
              type="text"
              {...register("address", { required: "Address is required" })}
              placeholder="Enter delivery address"
              className={`w-full px-5 py-3 rounded-xl border text-black ${
                errors.address
                  ? "border-red-400 bg-red-50"
                  : "border-purple-200 bg-purple-50"
              } focus:outline-none focus:ring-2 focus:ring-purple-300 transition`}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
          {/* email Field */}
          {!token && (
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-md font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "email is required" })}
                placeholder="Enter email address"
                className={`w-full px-5 py-3 rounded-xl border text-black ${
                  errors.email
                    ? "border-red-400 bg-red-50"
                    : "border-purple-200 bg-purple-50"
                } focus:outline-none focus:ring-2 focus:ring-purple-300 transition`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          )}

          {/* Amount Field */}
          <div>
            <label
              htmlFor="amount"
              className="block mb-2 text-md font-medium text-gray-700"
            >
              💰 Total Amount
            </label>
            <input
              id="amount"
              type="number"
              readOnly
              {...register("amount", {
                required: "Amount is required",
                min: { value: 1, message: "Amount must be at least 1" },
              })}
              className={`w-full px-5 py-3 rounded-xl border text-black ${
                errors.amount
                  ? "border-red-400 bg-red-50"
                  : "border-yellow-200 bg-yellow-50"
              } focus:outline-none focus:ring-2 focus:ring-yellow-300 transition`}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || isSubmitting}
            className={`w-full py-3 rounded-full text-lg font-semibold shadow-md transition-transform duration-300 ${
              isSubmitting
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white hover:scale-105"
            }`}
          >
            {isSubmitting ? "Processing..." : "🚀 Order Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
