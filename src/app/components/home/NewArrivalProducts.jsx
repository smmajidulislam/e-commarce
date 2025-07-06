"use client";
import ProductCard from "./Product";
import { useGetProductsQuery } from "../../features/product/productApi";
import Skeletons from "../global/Skeletons";

const NewArrivalProducts = () => {
  const { data, isLoading } = useGetProductsQuery({ latest: true });
  return (
    <div className="flex flex-wrap justify-center gap-4 px-2 py-6">
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

export default NewArrivalProducts;
