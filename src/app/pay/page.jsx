"use client";

import Link from "next/link";

export default function PaymentPage() {
  const paymentOptions = [
    {
      name: "Stripe",
      path: "/stripe",
      bg: "from-purple-400 via-pink-400 to-red-400",
    },
    {
      name: "SSL Commerz",
      path: "/checkout",
      bg: "from-cyan-400 via-blue-400 to-indigo-500",
    },
    {
      name: "Cash on Delivery",
      path: "/cashOnDelevery",
      bg: "from-green-300 via-pink-300 to-indigo-300",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-6 flex items-center justify-center">
      <div className="w-full max-w-md md:max-w-xl lg:max-w-3xl mx-auto text-center space-y-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 drop-shadow-sm">
          Choose Your Payment Method
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paymentOptions.map((option) => (
            <Link key={option.name} href={option.path}>
              <div
                className={`p-6 rounded-2xl shadow-lg bg-gradient-to-br ${option.bg} hover:scale-105 transition-transform duration-300 cursor-pointer`}
              >
                <h2 className="text-xl md:text-2xl font-semibold text-white drop-shadow text-center">
                  {option.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
