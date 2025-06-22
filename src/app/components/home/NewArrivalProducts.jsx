"use client";
import ProductCard from "./Product";
import { useGetProductsQuery } from "../../features/product/productApi";

const NewArrivalProducts = () => {
  const { data, isLoading, error } = useGetProductsQuery({ latest: true });
  return (
    <div className="flex flex-wrap justify-center gap-2 px-2 py-6">
      {data?.data?.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default NewArrivalProducts;
