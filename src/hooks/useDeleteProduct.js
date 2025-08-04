import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteProduct } from "../api/productApi";
import { toast } from "react-toastify";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data, id) => {
      
      queryClient.setQueryData(["products"], (oldData) =>
        oldData?.filter((product) => product.id !== id)
      );

      console.log("Product was Deleted Successfully, Response:", data);
      toast.success("Product deleted successfully");
    },
    onError: (error) => {
      console.error("Error in deleting", error.message);
      toast.error("Failed to delete product. Please try again.");
    },
  });
};
