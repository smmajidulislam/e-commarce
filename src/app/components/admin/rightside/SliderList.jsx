"use client";

import Image from "next/image";
import {
  useGetSlidersQuery,
  useCreateSliderMutation,
  useUpdateSliderMutation,
  useDeleteSliderMutation,
} from "../../../features/sliderApi/sliderApi";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { uploadToCloudinary } from "../../../utils/cloudnary";

const SliderList = () => {
  const { data, isLoading } = useGetSlidersQuery();
  const sliders = data?.data || [];

  const [createSlider] = useCreateSliderMutation();
  const [updateSlider] = useUpdateSliderMutation();
  const [deleteSlider] = useDeleteSliderMutation();

  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      imageFile: null,
    },
  });

  // Edit mode হলে আগের ছবি দেখানোর জন্য
  const handleEdit = (slider) => {
    reset({ imageFile: null });
    setEditId(slider._id);
  };

  // ফাইল আপলোড এবং create/update কল
  const onSubmit = async (formData) => {
    const file = formData.imageFile?.[0];
    if (!file) {
      alert("Please select an image file.");
      return;
    }

    setUploading(true);
    try {
      // Cloudinary তে আপলোড
      const imageUrl = await uploadToCloudinary(file);

      if (editId) {
        await updateSlider({ id: editId, data: { image: imageUrl } }).unwrap();
        setEditId(null);
      } else {
        await createSlider({ image: imageUrl }).unwrap();
      }

      reset({ imageFile: null });
    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  // ডিলিট ফাংশন
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this slider?")) {
      await deleteSlider(id);
      if (editId === id) setEditId(null);
    }
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    reset({ imageFile: null });
    setEditId(null);
  };

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-cyan-100 to-blue-100 min-h-screen dark:from-gray-900 dark:to-gray-800">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-blue-800 dark:text-white">
        Slider Management
      </h2>

      {/* Create / Update Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mx-auto mb-8 bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg"
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          {editId ? "Update Slider" : "Create New Slider"}
        </h3>

        <label className="block mb-2 font-medium text-gray-700 dark:text-white">
          Select Image File
        </label>
        <input
          type="file"
          accept="image/*"
          {...register("imageFile", { required: true })}
          className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-white"
        />
        {errors?.imageFile && (
          <p className="text-red-600 mt-1">Please select an image.</p>
        )}

        {uploading && (
          <p className="text-blue-600 mt-2 font-semibold">Uploading image...</p>
        )}

        <div className="mt-4 flex gap-3">
          <button
            type="submit"
            disabled={uploading}
            className={`px-6 py-2 rounded font-semibold text-white ${
              editId
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {editId ? "Update Slider" : "Create Slider"}
          </button>

          {editId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              disabled={uploading}
              className="px-6 py-2 rounded bg-gray-400 hover:bg-gray-500 text-white font-semibold"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Slider List */}
      {isLoading ? (
        <p className="text-center text-gray-700 dark:text-gray-300">
          Loading sliders...
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sliders.map((slider) => (
            <div
              key={slider._id}
              className="bg-white dark:bg-gray-700 shadow-xl rounded-xl p-4 space-y-4"
            >
              <div className="relative w-full h-32">
                <Image
                  src={slider.image}
                  alt="slider image"
                  fill
                  style={{ objectFit: "cover", borderRadius: "0.5rem" }}
                  priority={false}
                  sizes="(max-width: 768px) 100vw,
                         (max-width: 1200px) 50vw,
                         33vw"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(slider)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(slider._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SliderList;
