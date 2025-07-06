"use client";

import React from "react";
import { useGetProductReportQuery } from "../../../features/reportApi/reportApi";

const getStatusColor = (stock) =>
  stock === "In Stock"
    ? "bg-green-100 text-green-700"
    : "bg-red-100 text-red-700";

export default function ProductReport() {
  const { data, error, isLoading } = useGetProductReportQuery();

  if (isLoading)
    return <div className="text-center p-8">Loading report...</div>;

  if (error)
    return (
      <div className="text-center p-8 text-red-600">
        Error loading report: {error?.status || "Unknown error"}
      </div>
    );

  const productReports = data?.data || [];

  return (
    <section className="rounded-2xl p-4 h-screen overflow-auto hide-scrollbar bg-gradient-to-br from-pink-50 via-yellow-100 to-purple-50">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-purple-700 mb-6">
          Product Sales Report
        </h1>

        {/* Mobile First Cards */}
        <div className="space-y-4 md:hidden">
          {productReports.map(({ id, title, sold, stock, revenue }) => (
            <div
              key={id}
              className="rounded-xl shadow-lg p-4 bg-white border-l-8 border-purple-400"
            >
              <h2 className="text-xl font-semibold text-purple-800">{title}</h2>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Sold:</strong> {sold} pcs
              </p>
              <p className="text-sm text-gray-600">
                <strong>Revenue:</strong> ৳{revenue.toLocaleString()}
              </p>
              <span
                className={`inline-block mt-2 px-3 py-1 text-sm rounded-full font-medium ${getStatusColor(
                  stock
                )}`}
              >
                {stock}
              </span>
            </div>
          ))}
        </div>

        {/* Table View for Tablet/Desktop */}
        <div className="hidden md:block overflow-x-auto rounded-2xl shadow-lg">
          <table className="w-full table-auto text-left bg-white">
            <thead>
              <tr className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Sold</th>
                <th className="px-4 py-3">Revenue (৳)</th>
                <th className="px-4 py-3">Stock</th>
              </tr>
            </thead>
            <tbody>
              {productReports.map(({ id, title, sold, revenue, stock }) => (
                <tr
                  key={id}
                  className="border-b hover:bg-pink-50 transition duration-300"
                >
                  <td className="px-4 py-3 font-medium text-purple-800">
                    {title}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{sold}</td>
                  <td className="px-4 py-3 text-gray-700">
                    ৳{revenue.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor(
                        stock
                      )}`}
                    >
                      {stock}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
