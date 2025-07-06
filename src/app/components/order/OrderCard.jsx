"use client";
import React from "react";

const OrderCard = ({ order }) => {
  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 border border-purple-200 rounded-3xl shadow-xl p-6 w-full max-w-3xl mx-auto mb-8 hover:shadow-2xl transition-all duration-300">
      <h2 className="text-2xl font-extrabold text-purple-700 mb-3">
        🧾 Order ID: <span className="text-gray-800">{order?._id}</span>
      </h2>

      <p className="text-md text-gray-700 mb-1">
        👤 <span className="font-medium">User:</span> {order?.user?.name}
      </p>
      <p className="text-md text-gray-700 mb-1">
        📍 <span className="font-medium">Delivery Address:</span>{" "}
        {order?.deliveryAddress}
      </p>

      {/* Products List */}
      <div className="mt-4 bg-white rounded-xl p-4 shadow-sm">
        <h3 className="text-lg font-bold text-pink-600 mb-2">🛍️ Products:</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-800">
          {order.products.map((item, index) => (
            <li key={index}>
              {item?.product?.title}{" "}
              <span className="text-sm text-gray-500">(x{item?.quantity})</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Total Amount */}
      <p className="mt-4 text-xl font-bold text-indigo-600">
        💰 Total Amount: ${order?.totalAmount.toFixed(2)}
      </p>
      {/* paid status */}
      <p
        className={`mt-4 text-xl font-bold ${
          order?.paid === true ? "text-indigo-600" : "text-red-500"
        }`}
      >
        💰 Paid : {order?.paid === true ? " Paid" : "Cash On Deleviry"}
      </p>

      {/* Statuses */}
      <div className="mt-4 flex flex-wrap gap-3">
        <span className="text-sm px-4 py-1 bg-yellow-200 text-yellow-900 rounded-full font-medium shadow">
          🚚 Order Status: {order?.orderStatus}
        </span>
        <span className="text-sm px-4 py-1 bg-purple-200 text-purple-900 rounded-full font-medium shadow">
          🔒 Admin Status: {order?.adminApprovalStatus}
        </span>
      </div>

      {/* Date */}
      <p className="mt-3 text-sm text-gray-500 italic">
        📅 Ordered At: {new Date(order?.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default OrderCard;
