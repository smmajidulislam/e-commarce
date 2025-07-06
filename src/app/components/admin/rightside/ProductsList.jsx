"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/app/features/product/productApi";
import { useGetCategoriesQuery } from "@/app/features/category/categoryApi";
import Link from "next/link";

export default function ProductsList() {
  const [editId, setEditId] = useState(null);
  const [categories, setCategories] = useState([]);

  const { data: categoryData } = useGetCategoriesQuery();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Flatten nested categories
  useEffect(() => {
    if (categoryData?.data) {
      const flat = [];
      const flatten = (node, parentId = null) => {
        flat.push({
          id: node._id,
          name: node.name,
          parent: parentId || node.parent?._id || null,
        });
        node.children?.forEach((child) => flatten(child, node._id));
      };
      categoryData.data.forEach((cat) => flatten(cat));
      setCategories(flat);
    }
  }, [categoryData]);

  const onSubmit = async (data) => {
    try {
      if (editId) {
        await updateProduct({ id: editId, data });
        setEditId(null);
      } else {
        await createProduct(data); // ✅ Normal JSON object
      }
      reset();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <section className="h-screen bg-gradient-to-tr from-yellow-100 via-pink-100 to-purple-100 p-4 text-black rounded-2xl">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-6">
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-6">
          {editId ? "✏️ Update Product" : "🎉 Create New Product"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              {...register("title", { required: "Title is required" })}
              placeholder="Product Title"
              className={`border px-3 py-2 rounded-lg text-black ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            <select
              {...register("stock", { required: true })}
              className="border px-3 py-2 rounded-lg text-black"
            >
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
            <input
              {...register("price", { required: "Price required" })}
              type="number"
              step="0.01"
              placeholder="Price"
              className={`border px-3 py-2 rounded-lg text-black ${
                errors.price ? "border-red-500" : "border-gray-300"
              }`}
            />
            <input
              {...register("image")}
              type="file"
              accept="image/*"
              className="border px-3 py-2 rounded-lg text-black bg-white"
            />
          </div>

          <textarea
            {...register("description")}
            placeholder="Description"
            className="w-full border px-3 py-2 rounded-lg text-black"
          />

          <select
            {...register("category", { required: "Category is required" })}
            className="w-full border px-3 py-2 rounded-lg text-black bg-white"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <button
              type="submit"
              className={`flex-1 py-2 font-semibold rounded-lg text-white ${
                editId
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
              }`}
            >
              {editId ? "Update" : "Create"} Product
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  reset();
                }}
                className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      <Link href="/admin/products/allProducts" className="text-blue-600 ">
        <p
          className="text-center mt-4 border border-blue-600 py-2 rounded-lg hover:bg-amber-400
          hover:text-black hover:font-bold cursor-pointer hover:border-0"
        >
          All Products
        </p>
      </Link>
    </section>
  );
}
