"use client";
import { useDispatch, useSelector } from "react-redux";
import { setProfileTab } from "../../features/profileTabSlice/profileTabSlice";
import { useAuth } from "@/app/hooks/UseAuth";

const LeftSideProfile = () => {
  const dispatch = useDispatch();
  const currentTab = useSelector((state) => state.profileTab);
  const { logout } = useAuth();

  const tabs = [
    {
      key: "profile",
      label: "🧑  Profile",
      activeClass:
        "bg-gradient-to-r from-purple-400 to-purple-600 text-white shadow-lg",
      inactiveClass:
        "bg-white text-gray-700 hover:from-purple-200 hover:to-purple-400 hover:bg-gradient-to-r hover:text-purple-900",
      focusRing: "focus:ring-purple-300",
    },
    {
      key: "wishlist",
      label: "💖  Wishlist",
      activeClass:
        "bg-gradient-to-r from-pink-400 to-pink-600 text-white shadow-lg",
      inactiveClass:
        "bg-white text-gray-700 hover:from-pink-200 hover:to-pink-400 hover:bg-gradient-to-r hover:text-pink-900",
      focusRing: "focus:ring-pink-300",
    },
    {
      key: "orders",
      label: "📦  Orders",
      activeClass:
        "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg",
      inactiveClass:
        "bg-white text-gray-700 hover:from-yellow-200 hover:to-yellow-400 hover:bg-gradient-to-r hover:text-yellow-900",
      focusRing: "focus:ring-yellow-300",
    },
  ];

  return (
    <div className="h-screen w-full bg-gradient-to-b from-purple-50 via-pink-50 to-yellow-50 shadow-lg border-r border-purple-200 flex flex-col py-12 px-6 space-y-8 rounded-3xl">
      <h2 className="text-3xl font-extrabold text-purple-700 text-center mb-6 select-none">
        My Account
      </h2>

      <nav className="flex flex-col space-y-4">
        {tabs.map(({ key, label, activeClass, inactiveClass, focusRing }) => (
          <button
            key={key}
            onClick={() => dispatch(setProfileTab(key))}
            className={`w-full text-left px-6 py-4 rounded-3xl font-semibold text-lg transition focus:outline-none ${focusRing} ${
              currentTab === key ? activeClass : inactiveClass
            }`}
          >
            {label}
          </button>
        ))}

        <button
          className="w-full text-left px-6 py-4 rounded-3xl font-semibold text-lg text-red-600 bg-white hover:bg-red-100 hover:text-red-700 transition focus:outline-none focus:ring-4 focus:ring-red-300"
          onClick={() => logout()}
        >
          🚪 Log out
        </button>
      </nav>
    </div>
  );
};

export default LeftSideProfile;
