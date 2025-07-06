"use client";

import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";

import Skeleton from "../../../../components/skeliton/SingelProductSkeliton";

import {
  useGetProductByIdQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "@/app/features/product/productApi";
import { addToWishlist } from "@/app/features/wishlishtSlice/wishlist";
import { setProductLayout } from "@/app/features/productLayout/productLayout";

import { uploadToCloudinary } from "../../../../utils/cloudnary"; // তোমার Cloudinary আপলোড ফাংশন

const SingelAdminProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  // State for showing update form
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Fetch product data
  const { data, isLoading, isError } = useGetProductByIdQuery(id, {
    skip: !id,
  });
  const product = data?.data;

  // Delete mutation
  const [
    deleteProduct,
    { isLoading: isDeleting, isSuccess: isDeleted, error: deleteError },
  ] = useDeleteProductMutation();

  // Update mutation
  const [updateProduct, { isLoading: isUpdating, error: updateError }] =
    useUpdateProductMutation();

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      stock: "",
      image: "",
    },
  });

  // Load product data into form on product load or edit start
  useEffect(() => {
    if (product) {
      reset({
        title: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock,
        image: product.image,
      });
    }
  }, [product, reset]);

  // Layout effect
  useEffect(() => {
    dispatch(setProductLayout(false));
    return () => dispatch(setProductLayout(true));
  }, [dispatch]);

  // Redirect after delete
  useEffect(() => {
    if (isDeleted) {
      router.push("/admin/products");
    }
  }, [isDeleted, router]);

  // Handle delete confirm (same as before)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const onDeleteConfirm = async () => {
    try {
      // await deleteImageFromCloudinary(product.image); // Optional: delete old image from cloudinary
      await deleteProduct(id).unwrap();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  // Image upload handler (onChange of file input)
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setValue("image", url, { shouldValidate: true });
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  // On form submit update product
  const onSubmit = async (formData) => {
    try {
      await updateProduct({ id, ...formData }).unwrap();
      setIsEditing(false);
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update product.");
    }
  };

  if (isLoading) return <Skeleton />;
  if (isError)
    return (
      <p className="text-red-600 text-center mt-10">Failed to load product.</p>
    );
  if (!product) return <p className="text-center mt-10">No product found.</p>;

  return (
    <div className="min-h-screen bg-[#e0f7fa] dark:bg-[#004d40] text-[#004d40] dark:text-[#e0f7fa] p-4 md:p-8 lg:p-12 rounded-2xl">
      <div className="max-w-6xl mx-auto bg-[#fbe9e7] dark:bg-[#00695c] rounded-2xl shadow-lg p-6 md:p-10 min-h-[600px] flex flex-col justify-center">
        {!isEditing ? (
          <>
            {/* Product Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {product.image && (
                <div className="w-full relative h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden bg-[#ffe0b2] dark:bg-[#004d40] shadow-md">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              <div>
                <h1 className="text-3xl font-bold mb-4 text-[#d84315] dark:text-[#ffab91]">
                  {product.title}
                </h1>
                <p className="text-lg mb-2">{product.description}</p>
                <p
                  className={`font-semibold mb-2 ${
                    product.stock === "In Stock"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {product.stock}
                </p>
                <p className="text-xl font-bold text-[#6a1b9a] dark:text-[#ce93d8] mb-4">
                  ${product.price}
                </p>

                <div className="flex gap-4 flex-wrap">
                  <button
                    onClick={() => dispatch(addToWishlist(product))}
                    className="bg-[#ff6f00] hover:bg-[#ff8f00] text-white px-6 py-2 rounded-xl transition"
                  >
                    Add to Wishlist
                  </button>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition"
                  >
                    Edit Product
                  </button>

                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl transition"
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete Product"}
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Update form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-lg mx-auto space-y-4"
              noValidate
            >
              <div>
                <label className="block mb-1 font-semibold" htmlFor="title">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  {...register("title", { required: "Title is required" })}
                  className="w-full p-2 rounded border border-gray-400"
                />
                {errors.title && (
                  <p className="text-red-600 mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label
                  className="block mb-1 font-semibold"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  rows={4}
                  className="w-full p-2 rounded border border-gray-400"
                />
                {errors.description && (
                  <p className="text-red-600 mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-semibold" htmlFor="price">
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  {...register("price", { required: "Price is required" })}
                  className="w-full p-2 rounded border border-gray-400"
                />
                {errors.price && (
                  <p className="text-red-600 mt-1">{errors.price.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-semibold" htmlFor="stock">
                  Stock Status
                </label>
                <select
                  id="stock"
                  {...register("stock", {
                    required: "Stock status is required",
                  })}
                  className="w-full p-2 rounded border border-gray-400"
                >
                  <option value="">Select Stock Status</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
                {errors.stock && (
                  <p className="text-red-600 mt-1">{errors.stock.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-semibold" htmlFor="image">
                  Product Image
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full"
                />
                {uploading && (
                  <p className="text-blue-600 mt-1">Uploading...</p>
                )}

                {/* Preview */}
                {watch("image") && typeof watch("image") === "string" && (
                  <div className="mt-2 w-40 h-40 relative rounded overflow-hidden">
                    <img
                      src={watch("image")}
                      alt="Product"
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isUpdating || uploading}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
                >
                  {isUpdating ? "Updating..." : "Update Product"}
                </button>

                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  disabled={isUpdating}
                  className="bg-gray-400 hover:bg-gray-500 text-gray-900 px-6 py-2 rounded"
                >
                  Cancel
                </button>
              </div>

              {updateError && (
                <p className="text-red-600 mt-2">
                  Update failed:{" "}
                  {updateError.data?.message || updateError.message}
                </p>
              )}
            </form>
          </>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={() => setShowDeleteConfirm(false)}
          >
            <div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Confirm Deletion
              </h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Are you sure you want to delete <strong>{product.title}</strong>
                ? This action cannot be undone.
              </p>

              <form onSubmit={handleSubmit(onDeleteConfirm)}>
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded mr-3"
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Yes, Delete"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded"
                  disabled={isDeleting}
                >
                  Cancel
                </button>
              </form>

              {deleteError && (
                <p className="text-red-600 mt-3">
                  Error deleting product:{" "}
                  {deleteError.data?.message || deleteError.message}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingelAdminProductDetails;
