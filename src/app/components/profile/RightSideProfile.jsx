"use client";
import { useSelector } from "react-redux";
import Profile from "./Profile";
import WishlistPage from "./wishlistPage";
import Order from "../order/Order";

const RightSideContent = () => {
  const currentTab = useSelector((state) => state.profileTab);

  return (
    <div className="w-full px-6 py-10 bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 rounded-3xl shadow-xl min-h-[85vh] overflow-auto">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-8 sm:p-12 border border-purple-300">
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-purple-700 mb-8 text-center select-none">
          {currentTab === "profile" && "Your Profile"}
          {currentTab === "wishlist" && "Your Wishlist"}
          {currentTab === "orders" && "Your Orders"}
        </h1>

        {/* Content Area */}
        <div className="text-gray-800">
          {currentTab === "profile" && <Profile />}
          {currentTab === "wishlist" && <WishlistPage />}
          {currentTab === "orders" && <Order />}
        </div>
      </div>
    </div>
  );
};

export default RightSideContent;
