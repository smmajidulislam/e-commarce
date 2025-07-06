"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../../features/adminUserList/userapi";

export default function UserList() {
  const { data, isLoading } = useGetUsersQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [editId, setEditId] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    await updateUser({ id: editId, ...data });
    setEditId(null);
  };

  const handleCancel = () => {
    setEditId(null);
  };

  const handleEdit = (user) => {
    setEditId(user._id);
    reset(user);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
  };

  if (isLoading) return <p className="text-center text-xl">Loading...</p>;

  return (
    <div className="p-4 max-w-5xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center text-[#FF6B6B] mb-4">
        User List
      </h1>

      {data?.map((user) =>
        editId === user._id ? (
          <form
            key={user._id}
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row sm:flex-wrap items-center gap-2 bg-[#FFE66D] p-4 rounded-xl shadow-md"
          >
            <input
              {...register("name", { required: true })}
              placeholder="Name"
              className="input-style text-black border-2 p-2 rounded-2xl text-center border-[#FF6B6B]"
            />
            <input
              {...register("email", { required: true })}
              placeholder="Email"
              className="input-style text-black border-2 p-2 rounded-2xl text-center border-[#FF6B6B]"
            />
            <input
              {...register("phone", { required: true })}
              placeholder="Phone"
              className="input-style text-black border-2 p-2 rounded-2xl text-center border-[#FF6B6B]"
            />
            <div className="flex gap-2">
              <button type="submit" className="btn bg-[#06D6A0]">
                Save
              </button>
              <button
                type="button"
                className="btn bg-red-500"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div
            key={user._id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-[#A0C4FF] p-4 rounded-xl shadow-md"
          >
            <div className="text-black space-y-1">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(user)}
                className="btn bg-[#06D6A0] text-white"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="btn bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
