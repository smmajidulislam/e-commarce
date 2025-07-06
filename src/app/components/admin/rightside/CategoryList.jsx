"use client";

import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "@/app/features/category/categoryApi";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const CategoryList = () => {
  const { data, isLoading } = useGetCategoriesQuery();
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);

  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [createCategory] = useCreateCategoryMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (data?.data) {
      const flattenCategories = [];

      const flatten = (node, parentId = null) => {
        const { _id, name, parent, children } = node;
        flattenCategories.push({
          id: _id,
          name,
          parent: parent?._id || parentId,
        });
        children?.forEach((child) => flatten(child, _id));
      };

      data.data.forEach((item) => flatten(item));

      setCategories(flattenCategories);
    }
  }, [data]);

  const handleEdit = (category) => {
    setEditId(category.id);
    setValue("name", category.name);
    setValue("parent", category.parent || "");
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;

    try {
      await deleteCategory(id).unwrap();
    } catch (err) {
      alert("Failed to delete category");
      console.error(err);
    }
  };

  const onSubmit = async (formData) => {
    try {
      if (editId) {
        await updateCategory({ id: editId, data: formData }).unwrap();
        setEditId(null);
      } else {
        await createCategory(formData).unwrap();
      }
      reset();
    } catch (err) {
      alert("Something went wrong");
      console.error(err);
    }
  };

  return (
    <section className="rounded-2xl max-h-screen overflow-y-scroll hide-scrollbar p-4 bg-gradient-to-tr from-pink-100 via-yellow-50 to-purple-100">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-6">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          Category List
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid md:flex md:items-center gap-3 mb-6"
        >
          <input
            {...register("name", { required: "Category name is required" })}
            placeholder="Enter category name"
            className={`w-full md:flex-1 border px-3 py-2 rounded-xl text-black ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          <select
            {...register("parent")}
            className="w-full md:w-48 border px-3 py-2 rounded-xl text-black border-gray-300"
          >
            <option value="">No Parent</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <button
              type="submit"
              className={`px-4 py-2 rounded-xl text-white ${
                editId
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {editId ? "Update" : "Create"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  reset();
                }}
                className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-xl"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full table-auto border-2  rounded-xl">
            <thead>
              <tr className="bg-gradient-to-r from-purple-500 to-pink-400 text-white">
                <th className="text-left p-3">Category Name</th>
                <th className="text-left p-3">Parent</th>
                <th className="text-center p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className="border-b hover:bg-pink-50">
                  <td className="p-3 text-black">{cat.name}</td>
                  <td className="p-3 text-black">
                    {categories.find((c) => c.id === cat.parent)?.name || "-"}
                  </td>
                  <td className="p-3 text-center space-x-3">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden flex flex-col gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-gradient-to-r from-purple-400 to-pink-400 text-white p-4 rounded-xl shadow-md"
            >
              <h3 className="text-lg font-semibold">{cat.name}</h3>
              <p className="text-sm mb-2">
                <span className="font-semibold">Parent:</span>{" "}
                {categories.find((c) => c.id === cat.parent)?.name || "None"}
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleEdit(cat)}
                  className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
