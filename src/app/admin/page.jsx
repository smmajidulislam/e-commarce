"use client";
import { useEffect, useState } from "react";

const AdminHomePage = () => {
  const [time, setTime] = useState({
    hour: "--",
    minute: "--",
    second: "--",
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime({
        hour: now.getHours().toString().padStart(2, "0"),
        minute: now.getMinutes().toString().padStart(2, "0"),
        second: now.getSeconds().toString().padStart(2, "0"),
      });
    };

    updateTime(); // initial set
    const interval = setInterval(updateTime, 1000); // update every second

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 p-6 flex items-center justify-center rounded-2xl">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-10 space-y-8 border-4 border-purple-300">
        {/* Welcome Message */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-purple-700 mb-2">
            🎉 Welcome, Admin!
          </h1>
          <p className="text-lg text-gray-700">
            You have full access to manage the platform. Take a deep breath and
            rule the dashboard 😎
          </p>
        </div>

        {/* Admin Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-purple-200/50 p-6 rounded-xl shadow-md border-l-4 border-purple-500 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <h2 className="text-xl font-bold text-purple-800 mb-2">
              👨‍💼 Your Role
            </h2>
            <p className="text-gray-800">Admin</p>
          </div>
          <div className="bg-pink-200/50 p-6 rounded-xl shadow-md border-l-4 border-pink-500 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <h2 className="text-xl font-bold text-pink-800 mb-2">
              📅 Today's Date
            </h2>
            <p className="text-gray-800">{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Time Section (Hour, Minute, Second) */}
        <div className="grid md:grid-cols-3 gap-6 mt-4">
          <div className="bg-green-100 p-6 rounded-xl text-center shadow-md border-b-4 border-green-400 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <h3 className="text-2xl font-bold text-green-700">{time.hour}</h3>
            <p className="text-gray-700">Live Hour</p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-xl text-center shadow-md border-b-4 border-yellow-400 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <h3 className="text-2xl font-bold text-yellow-700">
              {time.minute}
            </h3>
            <p className="text-gray-700">Minute</p>
          </div>
          <div className="bg-blue-100 p-6 rounded-xl text-center shadow-md border-b-4 border-blue-400 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <h3 className="text-2xl font-bold text-blue-700">{time.second}</h3>
            <p className="text-gray-700">Second</p>
          </div>
        </div>

        {/* Footer Message */}
        <div className="pt-6 border-t border-purple-200 text-center">
          <p className="text-sm text-gray-600">
            Powered by{" "}
            <span className="font-semibold text-purple-600">Admin Panel</span> |
            Always in control 💻
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
