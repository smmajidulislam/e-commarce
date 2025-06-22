"use client";
import ProductCard from "./Product";
import { useGetProductsQuery } from "../../features/product/productApi";

const Products = () => {
  const { data, isLoading, error } = useGetProductsQuery({ sold: true });
  return (
    <div className="flex flex-wrap justify-center gap-2 px-2 py-6">
      {data?.data?.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Products;
