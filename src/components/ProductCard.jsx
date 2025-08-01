import React from "react";
import { useProducts } from "../hooks/useProduct";
import AddProductForm from "./AddProductForm";

const ProductCard = () => {
  const { data, isLoading, error } = useProducts();

  if (isLoading) return <p className="text-center mt-4">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-4 text-red-500">Error: {error.message}</p>
    );
    console.log(data);
    

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">My Products</h1>
      <AddProductForm/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {data.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={product.category.image}
              alt={product.title}
              className="w-full h-48 object-contain mb-4 rounded-lg"
            />
            <h2 className="text-md font-semibold mb-2 line-clamp-2">
              {product.title}
            </h2>
            <p className="text-gray-600 text-sm capitalize">
              {product.category.name}
            </p>
            <p className="text-lg font-bold mt-2">₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
