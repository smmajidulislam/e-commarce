// src/app/products/ProductWrapper.jsx
"use client";
import { useSelector } from "react-redux";
import Category from "../components/products/Category";

export default function ProductWrapper({ children }) {
  const productLayout = useSelector((state) => state.productLayout);

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 text-gray-800">
      <div className={productLayout ? "max-w-7xl mx-auto px-4 py-8" : "w-full"}>
        <div
          className={
            productLayout ? "flex flex-col lg:flex-row gap-6" : "w-full"
          }
        >
          {/* Sidebar Category */}
          {productLayout && (
            <aside className="w-full h-full lg:w-1/4 bg-white rounded-2xl shadow-md border border-purple-200 p-4 overflow-hidden">
              <h2 className="text-lg font-semibold text-purple-600 mb-4">
                Categories
              </h2>
              <Category />
            </aside>
          )}

          {/* Main Content Area */}
          <main
            className={
              productLayout
                ? "w-full lg:w-3/4 bg-white rounded-2xl shadow-md border border-blue-200 p-4 overflow-hidden"
                : "w-full bg-white rounded-2xl shadow-md border border-blue-200 p-4 overflow-hidden"
            }
          >
            {children}
          </main>
        </div>
      </div>
    </section>
  );
}
