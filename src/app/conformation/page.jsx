"use client";

import { useForm } from "react-hook-form";
import { useConfirmCodeMutation } from "../features/auth/authApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CodeConfirmationPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [confirmCode] = useConfirmCodeMutation();
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const queryEmail = searchParams.get("email");
    if (queryEmail) setEmail(queryEmail);
  }, []);

  const onSubmit = async (data) => {
    const res = await confirmCode({
      email,
      code: data.code,
    }).unwrap();
    if (res?.message === "Code confirmed successfully") {
      router.push(`/resetPassword?email=${email}`);
    } else {
      alert(res?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm sm:max-w-md md:max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Enter Confirmation Code
        </h2>

        <p className="mb-6 text-center text-gray-600">
          Please enter the 6-digit code sent to your email or phone.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          <div>
            <label
              htmlFor="code"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Confirmation Code
            </label>
            <input
              type="text"
              id="code"
              maxLength={6}
              placeholder="Enter 6-digit code"
              inputMode="numeric"
              pattern="[0-9]*"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 text-black ${
                errors.code
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
              {...register("code", {
                required: "Code is required",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "Code must be exactly 6 digits",
                },
              })}
            />
            {errors.code && (
              <p className="mt-1 text-sm text-red-600">{errors.code.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-2 rounded-md text-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {isSubmitting ? "Verifying..." : "Verify Code"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default CodeConfirmationPage;
