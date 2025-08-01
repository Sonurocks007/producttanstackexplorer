import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct as addProductAPI } from "../api/productApi";

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProductAPI,
    onSuccess: (data) => {
      console.log(" Product added successfully:", data);
      queryClient.invalidateQueries(["products"]);
    },
    onError: (error) => {
      console.error(" Error adding product:", error.message);
    },
  });
};
