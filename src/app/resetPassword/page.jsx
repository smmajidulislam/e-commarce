"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdatePasswordMutation } from "../features/auth/authApi";
import { useAuth } from "../hooks/UseAuth";
import { useRouter } from "next/navigation";

export default function UpdatePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const router = useRouter();
  const [updatePassword] = useUpdatePasswordMutation();
  const [email, setEmail] = useState("");
  const { token } = useAuth();
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const queryEmail = searchParams.get("email");

    if (token?.email) {
      setEmail(token.email);
    } else if (queryEmail) {
      setEmail(queryEmail);
    }
  }, [token]);

  const onSubmit = async (data) => {
    try {
      // এখানে তোমার API call হবে
      const res = await updatePassword({
        email,
        password: data?.password,
      }).unwrap();
      if (res?.message === "Password updated successfully") {
        if (token?.email) {
          router.push("/");
        } else {
          router.push("/login");
        }
      }
      reset();
    } catch (error) {
      alert("Failed to update password");
      console.log(error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-purple-300 dark:border-gray-700"
      >
        <h2 className="text-3xl font-extrabold text-purple-700 dark:text-yellow-400 mb-8 text-center">
          Update Password
        </h2>

        <label
          htmlFor="password"
          className="block text-black dark:text-gray-200 font-semibold mb-2"
        >
          New Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter new password"
          className={`w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-yellow-400 text-black dark:text-gray-200 mb-4 transition duration-300 ${
            errors.password ? "border-red-500" : ""
          }`}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-600 mb-4">{errors.password.message}</p>
        )}

        <label
          htmlFor="confirmPassword"
          className="block text-black dark:text-gray-200 font-semibold mb-2"
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm new password"
          className={`w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-yellow-400 text-black dark:text-gray-200 mb-6 transition duration-300 ${
            errors.confirmPassword ? "border-red-500" : ""
          }`}
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value, formValues) =>
              value === formValues.password || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <p className="text-red-600 mb-6">{errors.confirmPassword.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white font-semibold py-3 rounded-xl transition duration-300"
        >
          {isSubmitting ? "Updating..." : "Update Password"}
        </button>
      </form>
    </section>
  );
}
