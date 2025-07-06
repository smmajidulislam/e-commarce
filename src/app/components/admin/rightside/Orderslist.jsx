"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} from "../../../features/order/orderApi";

export default function OrdersList() {
  const { data, isLoading, isError, error } = useGetAllOrdersQuery();
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const [editOrderId, setEditOrderId] = useState(null);
  const [filter, setFilter] = useState({ status: "", approval: "", paid: "" });
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const handleEdit = (order) => {
    setEditOrderId(order._id);
    reset({
      orderStatus: order.orderStatus,
      adminApprovalStatus: order.adminApprovalStatus,
      paid: order.paid.toString(),
    });
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this order?")) {
      await deleteOrder(id);
      setEditOrderId(null);
    }
  };

  const onSubmit = async (formData) => {
    const paidValue = formData.paid === "true";

    try {
      await updateOrder({
        id: editOrderId,
        data: {
          orderStatus: formData.orderStatus,
          adminApprovalStatus: formData.adminApprovalStatus,
          paid: paidValue,
        },
      }).unwrap();
      setEditOrderId(null);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredOrders = (data?.data || []).filter((o) => {
    const matchStatus = !filter.status || o.orderStatus === filter.status;
    const matchApproval =
      !filter.approval || o.adminApprovalStatus === filter.approval;
    const matchPaid =
      !filter.paid ||
      (filter.paid === "true" && o.paid) ||
      (filter.paid === "false" && !o.paid);

    return matchStatus && matchApproval && matchPaid;
  });

  return (
    <div className="rounded-2xl bg-gradient-to-tr from-yellow-50 via-pink-100 to-purple-100 text-black p-4 ">
      <div className="max-w-4xl mx-auto w-full bg-white rounded-2xl shadow-xl p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-purple-600 text-center mb-6">
          🧾 Order List
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-4 md:mb-6">
          <select
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, status: e.target.value }))
            }
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Delivery Status</option>
            <option>Pending</option>
            <option>On The Way</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
          <select
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, approval: e.target.value }))
            }
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Admin Order Approvals</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
          <select
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, paid: e.target.value }))
            }
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Paid Status</option>
            <option value="true">Paid</option>
            <option value="false">Unpaid</option>
          </select>
        </div>

        {/* Scrollable Orders */}
        <div className="max-h-[500px] overflow-y-auto hide-scrollbar space-y-4 pr-2">
          {isLoading ? (
            <p className="text-center">Loading orders...</p>
          ) : isError ? (
            <p className="text-red-500 text-center">
              {error?.data?.message || "Something went wrong"}
            </p>
          ) : filteredOrders.length === 0 ? (
            <p className="text-center">No orders found.</p>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-gradient-to-br from-purple-200 to-pink-100 rounded-xl shadow p-4"
              >
                {editOrderId === order._id ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div className="font-semibold text-lg">
                      {order?.user?.name}
                    </div>
                    <p>Total: ${order.totalAmount}</p>
                    <p>Address: {order.deliveryAddress}</p>

                    <select
                      {...register("orderStatus")}
                      className="w-full border rounded p-2"
                    >
                      <option>Pending</option>
                      <option>On The Way</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>

                    <select
                      {...register("adminApprovalStatus")}
                      className="w-full border rounded p-2"
                    >
                      <option>Pending</option>
                      <option>Approved</option>
                      <option>Rejected</option>
                    </select>

                    <select
                      {...register("paid")}
                      className="w-full border rounded p-2"
                    >
                      <option value="true">✅ Paid</option>
                      <option value="false">❌ Unpaid</option>
                    </select>

                    <div className="flex justify-end gap-2">
                      <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                        disabled={isSubmitting}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditOrderId(null)}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="font-semibold text-lg">
                      {order?.user?.name}
                    </div>
                    <p>Total: ${order.totalAmount}</p>
                    <p>Address: {order.deliveryAddress}</p>
                    <p>Status: {order.orderStatus}</p>
                    <p>Approval: {order.adminApprovalStatus}</p>
                    <p>Paid: {order.paid ? "✅ Paid" : "❌ Unpaid"}</p>

                    <div className="flex justify-end gap-2 mt-2">
                      <button
                        onClick={() => handleEdit(order)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
