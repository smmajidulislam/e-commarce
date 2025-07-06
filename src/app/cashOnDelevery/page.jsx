"use client";
import Link from "next/link";

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-200 to-yellow-100 p-6">
      <div className="bg-white shadow-xl rounded-3xl p-8 max-w-md w-full text-center space-y-6 animate-fade-in">
        <svg
          className="mx-auto h-16 w-16 text-green-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
        <h2 className="text-2xl md:text-3xl font-bold text-green-600">
          Order Created Successfully!
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Thank you for your order. You’ll receive a confirmation email shortly.
        </p>
        <button className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300">
          <Link href="/">Home</Link>
        </button>
      </div>
    </div>
  );
};

export default Page;
