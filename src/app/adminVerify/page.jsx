import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-orange-100 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 transition-all duration-500">
      <div className="text-center px-6 py-10 rounded-3xl shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-red-200 dark:border-gray-700 max-w-lg w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-600 dark:text-yellow-400 mb-4">
          🔒 Access Denied
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-800 dark:text-gray-300">
          You are not authorized to view this page.
        </p>
      </div>
    </div>
  );
};

export default Page;
