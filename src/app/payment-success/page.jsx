"use client";
import Link from "next/link";
import { useEffect } from "react";
import { usePayment } from "../hooks/usePayment";

const Page = () => {
  const { clearPaymentData } = usePayment();
  useEffect(() => {
    clearPaymentData();
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-300 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10 max-w-md w-full text-center">
        {/* Success Check Mark */}
        <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100 border-4 border-green-400">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-green-600 mb-3">
          Payment Successful!
        </h1>

        <p className="text-gray-700 text-base md:text-lg mb-6">
          আপনার পেমেন্ট সফল হয়েছে। ধন্যবাদ আমাদের সেবা ব্যবহারের জন্য।
        </p>

        <div className="flex justify-center gap-4">
          <button className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg transition">
            <Link href="/profile">View Order</Link>
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded-lg transition">
            <Link href="/">Go Home</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
