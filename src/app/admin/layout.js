"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLeftSideProfile from "../components/admin/leftSide/AdminleftSide";
import { useAuth } from "../hooks/UseAuth"; // তুমি যেটা বানাইছো ধরে নিচ্ছি
import { useDispatch, useSelector } from "react-redux";
import Category from "../components/products/Category";
import { setCategoryProduct } from "../features/adminLayout/categoryProduct";

export default function ProductsLayout({ children }) {
  const { token, loading } = useAuth();
  const router = useRouter();
  const adminProductLayout = useSelector((state) => state.adminProductLayout);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading && !token?.role) {
      router.push("/adminVerify");
    }
  }, [token, loading]);

  if (loading || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Checking admin access...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-gray-800 dark:text-gray-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 h-fit rounded-3xl p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-xl border border-purple-200 dark:border-gray-600">
            {adminProductLayout ? <Category /> : <AdminLeftSideProfile />}
            {adminProductLayout && (
              <div className="flex justify-center items-center">
                <button
                  className="block mt-4 text-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl text-base sm:text-lg transition mx-0"
                  onClick={() => dispatch(setCategoryProduct(false))}
                >
                  Back to admin
                </button>
              </div>
            )}
          </aside>

          {/* Main Content */}
          <main className="w-full lg:w-3/4 min-h-screen rounded-3xl p-6 bg-white dark:bg-gray-900 shadow-xl border border-pink-200 dark:border-gray-700 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </section>
  );
}
