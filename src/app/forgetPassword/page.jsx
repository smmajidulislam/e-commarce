"use client";

import { useForm } from "react-hook-form";
import { useForgotPasswordMutation } from "../features/auth/authApi";
import { useRouter } from "next/navigation";

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [forgotPassword] = useForgotPasswordMutation();
  const router = useRouter();

  const onSubmit = async (data) => {
    const res = await forgotPassword({ email: data.email }).unwrap();
    if (res?.message === "Code sent successfully") {
      router.push(`/conformation?email=${data.email}`);
    } else {
      alert(res?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm sm:max-w-md md:max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Forgot Password
        </h2>

        <p className="mb-6 text-center text-gray-600">
          Enter your Gmail address to receive password reset instructions.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Gmail Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="your.email@gmail.com"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-indigo-500"
              } text-black`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                  message: "Please enter a valid Gmail address",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-2 rounded-md text-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send code now"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default ForgotPasswordPage;
