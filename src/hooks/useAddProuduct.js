import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const addProduct = async (newProduct) => {
  const res = await axios.post("https://fakestoreapi.com/products", newProduct);
  return res.data;
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProduct,
    onSuccess: (data) => {
      queryClient.setQueryData(["products"], (oldData) => {
        return [...(oldData || []), data];
      });

      console.log("Product added successfully, Response:", data);
      toast.success("Product added successfully");
    },
    onError: (error) => {
      console.error("Product not added: try again", error.message);
      toast.error("Failed to add product.");
    },
  });
};
