"use client";

import { useForm } from "react-hook-form";
import {
  useGetSettingQuery,
  useUpdateSettingMutation,
  useDeleteLogoMutation,
} from "../../../features/setting/settingApi";
import { uploadToCloudinary } from "../../../utils/cloudnary";
import { useState } from "react";

export default function SettingForm() {
  const { data, isLoading } = useGetSettingQuery();
  const [updateSetting] = useUpdateSettingMutation();
  const [deleteLogo] = useDeleteLogoMutation();
  const { register, handleSubmit, setValue } = useForm();
  const [logoPreview, setLogoPreview] = useState("");
  const onSubmit = (formData) => {
    const updatedData = {
      ...formData,
      whatsapp: formData.whatsapp?.replace(/\D/g, ""), // remove non-numeric
    };
    updateSetting(updatedData);
  };

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await uploadToCloudinary(file);
    setValue("logo", url); // Update hidden input
    setLogoPreview(url); // Show preview
  };

  const handleDeleteLogo = () => {
    deleteLogo();
    setLogoPreview("");
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow rounded-xl mt-4 dark:bg-gray-800">
      <h2 className="text-xl font-bold text-center mb-4 text-gray-700 dark:text-gray-100">
        Website Settings
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Logo Upload */}
        <div>
          <label className="block text-sm font-medium">Logo Upload</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="mt-1"
          />
          <input
            type="hidden"
            {...register("logo")}
            defaultValue={data?.logo}
          />

          {(logoPreview || data?.logo) && (
            <div className="mt-2 flex items-center justify-between">
              <img
                src={logoPreview || data.logo}
                alt="Logo"
                className="w-20 h-20 object-contain"
              />
              <button
                type="button"
                onClick={handleDeleteLogo}
                className="text-red-600 hover:underline"
              >
                Delete Logo
              </button>
            </div>
          )}
        </div>

        {/* Social Links */}
        <div>
          <label className="block text-sm font-medium">Facebook</label>
          <input
            defaultValue={data?.facebook}
            {...register("facebook")}
            className="w-full mt-1 p-2 border rounded"
            placeholder="https://facebook.com/yourpage"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Twitter</label>
          <input
            defaultValue={data?.twitter}
            {...register("twitter")}
            className="w-full mt-1 p-2 border rounded"
            placeholder="https://twitter.com/yourpage"
          />
        </div>

        {/* WhatsApp Number */}
        <div>
          <label className="block text-sm font-medium">WhatsApp Number</label>
          <input
            defaultValue={data?.whatsapp}
            {...register("whatsapp")}
            className="w-full mt-1 p-2 border rounded"
            placeholder="8801XXXXXXXXX"
          />
        </div>

        {/* Gmail */}
        <div>
          <label className="block text-sm font-medium">Gmail</label>
          <input
            defaultValue={data?.gmail}
            {...register("gmail")}
            className="w-full mt-1 p-2 border rounded"
            placeholder="example@gmail.com"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}
