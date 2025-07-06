// app/not-found.jsx
"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 transition-all">
      <div className="text-center px-6 py-12 rounded-3xl shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-purple-200 dark:border-gray-700 max-w-xl w-full">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-600 dark:text-yellow-400 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-lg sm:text-xl text-gray-800 dark:text-gray-300 mb-6">
          Sorry, the page you’re looking for doesn’t exist.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-base sm:text-lg transition"
        >
          🔙 Go to Home
        </Link>
      </div>
    </div>
  );
}
