"use client";

import React, { useState } from "react";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "@/app/features/adminUserList/userapi";
import { useAuth } from "@/app/hooks/UseAuth";
import Image from "next/image";
import Link from "next/link";
import { uploadToCloudinary } from "../../utils/cloudnary";

const Profile = () => {
  const { token } = useAuth();
  const { data: user, refetch } = useGetUserByIdQuery(token?._id, {
    skip: !token?._id,
  });
  const [updateUser] = useUpdateUserMutation();

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select an image first");
    setUploading(true);
    try {
      const imageUrl = await uploadToCloudinary(selectedFile);
      await updateUser({
        id: user._id,
        image: imageUrl,
      });
      await refetch();
      alert("Profile image updated successfully!");
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (error) {
      alert(error.message || "Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl mt-10 transition-all">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Avatar Section */}
        <div className="flex flex-col items-center md:items-start">
          <div className="w-36 h-36 relative rounded-full overflow-hidden ring-4 ring-indigo-500 shadow-md">
            <Image
              src={
                previewUrl || user?.image || "https://via.placeholder.com/150"
              }
              alt="User Avatar"
              fill
              className="object-cover"
            />
          </div>
          <label className="mt-4 w-full">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <span className="inline-block cursor-pointer bg-indigo-50 dark:bg-zinc-800 dark:text-indigo-300 text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-100 dark:hover:bg-zinc-700">
              Change Image
            </span>
          </label>
          {selectedFile && (
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="mt-3 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-60"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          )}
        </div>

        {/* Info Section */}
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-800 dark:text-white">
              {user?.name}
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400">{user?.email}</p>
            <p className="text-zinc-500 dark:text-zinc-400">{user?.phone}</p>
          </div>

          <div className="mt-6">
            <Link href="/resetPassword">
              <span className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-md hover:shadow-xl transition duration-300">
                Reset Password
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
