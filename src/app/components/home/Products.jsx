"use client";
import ProductCard from "./Product";
import Skeletons from "../global/Skeletons";
import { useGetProductsQuery } from "../../features/product/productApi";

const Products = () => {
  const { data, isLoading } = useGetProductsQuery({ sold: true });

  return (
    <div className="flex flex-wrap justify-center gap-4 px-4 py-8  min-h-screen">
      {isLoading ? (
        <Skeletons quantity={8} />
      ) : (
        data?.data?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      )}
    </div>
  );
};

export default Products;
