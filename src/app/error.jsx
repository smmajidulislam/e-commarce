"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("App Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-yellow-100 to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 transition-all">
      <div className="text-center px-6 py-12 rounded-3xl shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-red-200 dark:border-gray-700 max-w-xl w-full">
        <h1 className="text-3xl sm:text-4xl font-bold text-red-600 dark:text-yellow-400 mb-4">
          🚨 Something went wrong!
        </h1>
        <p className="text-lg sm:text-xl text-gray-800 dark:text-gray-300 mb-6">
          {error?.message || "Unexpected application error occurred."}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-base sm:text-lg transition"
          >
            🔄 Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl text-base sm:text-lg transition"
          >
            🏠 Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
