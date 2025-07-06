"use client";

import { useGetCategoriesQuery } from "../../features/category/categoryApi";
import RecursiveCategory from "./ReccusCategory";

const SkeletonCategory = () => {
  return (
    <div className="animate-pulse space-y-2">
      <div className="h-4 bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 rounded w-1/2" />
      <div className="h-3 bg-gradient-to-r from-blue-200 via-teal-200 to-purple-200 rounded w-2/3 ml-4" />
      <div className="h-3 bg-gradient-to-r from-purple-200 via-yellow-200 to-pink-200 rounded w-1/3 ml-4" />
    </div>
  );
};

const Category = () => {
  const { data, isLoading, error } = useGetCategoriesQuery();

  if (isLoading) {
    return (
      <div className="p-4 h-screen overflow-hidden">
        <h2 className="text-xl font-bold mb-4 text-purple-600">
          All Categories
        </h2>
        <div className="space-y-4">
          {[...Array(6)].map((_, idx) => (
            <SkeletonCategory key={idx} />
          ))}
        </div>
      </div>
    );
  }

  if (error)
    return <p className="p-4 text-red-500">Failed to load categories.</p>;

  return (
    <div className="p-4 h-screen overflow-y-auto hide-scrollbar bg-gradient-to-b from-white via-purple-50 to-blue-50 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-purple-700">All Categories</h2>
      <div className="space-y-4">
        {data?.data?.map((category) => (
          <RecursiveCategory key={category?._id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Category;
