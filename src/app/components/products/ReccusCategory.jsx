"use client";
import { useDispatch } from "react-redux";
import { setSelectedCategory } from "../../features/category/categorySlice";

const RecursiveCategory = ({ category, level = 0 }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setSelectedCategory(category._id));
  };

  return (
    <div className="mt-2">
      <div
        onClick={handleClick}
        className={`ml-${
          level * 4
        } p-2 rounded-md hover:bg-gray-100 cursor-pointer font-medium text-gray-800`}
      >
        {category?.name}
      </div>

      {category?.children?.length > 0 && (
        <div className={`ml-${(level + 1) * 4} border-l pl-4`}>
          {category?.children.map((child) => (
            <RecursiveCategory
              key={child?._id}
              category={child}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecursiveCategory;
