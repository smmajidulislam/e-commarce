"use client";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCategoryProduct } from "../../../features/adminLayout/categoryProduct"; // পথ ঠিক রাখো

const AdminLeftSideProfile = () => {
  const [currentTab, setCurrentTab] = useState("");
  const dispatch = useDispatch();

  const tabs = [
    { key: "user", label: "👤 User", color: "purple" },
    { key: "orders", label: "📦 Orders", color: "pink" },
    { key: "category", label: "📂 Category", color: "purple" },
    { key: "products", label: "🛒 Products", color: "green" },
    { key: "reports", label: "📊 Reports", color: "green" },
    { key: "settings", label: "⚙️ Settings", color: "green" },
  ];

  // Predefined safe Tailwind classes to avoid hydration error
  const getColorClasses = (color, isActive) => {
    if (isActive) {
      return `bg-gradient-to-r from-${color}-400 to-${color}-600 text-white shadow-xl`;
    }

    const hoverClasses = {
      purple:
        "bg-white text-gray-700 hover:from-purple-100 hover:to-purple-300 hover:bg-gradient-to-r hover:text-purple-900",
      pink: "bg-white text-gray-700 hover:from-pink-100 hover:to-pink-300 hover:bg-gradient-to-r hover:text-pink-900",
      green:
        "bg-white text-gray-700 hover:from-green-100 hover:to-green-300 hover:bg-gradient-to-r hover:text-green-900",
    };

    return hoverClasses[color] || "bg-white text-gray-700";
  };

  return (
    <div className="h-screen w-full bg-gradient-to-b from-purple-100 via-pink-100 to-yellow-100 border-r border-purple-200 py-10 px-6 space-y-8 rounded-3xl shadow-xl backdrop-blur-md">
      <h2 className="text-3xl font-extrabold text-purple-700 text-center mb-6 select-none tracking-wide uppercase">
        <Link href="/admin">Admin Panel</Link>
      </h2>

      <nav className="flex flex-col space-y-4">
        {tabs.map(({ key, label, color }) => (
          <Link
            key={key}
            href={`/admin/${key}`}
            onClick={() => {
              setCurrentTab(key);
              if (key === "products") {
                dispatch(setCategoryProduct(true));
              }
            }}
            className={`w-full block text-left px-6 py-4 rounded-2xl font-semibold text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-${color}-300 ${getColorClasses(
              color,
              currentTab === key
            )}`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default AdminLeftSideProfile;
