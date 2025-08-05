import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../api/productApi";
import { toast } from "react-toastify";

let toastShown = false; 

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data, id) => {
      
      queryClient.setQueryData(["products"], (oldData) =>
        oldData?.filter((product) => product.id !== id)
      );

      console.log("Product was Deleted Successfully, Response:", data);

      
      if (!toastShown) {
        toast.success("Product deleted successfully");
        toastShown = true;

        
        setTimeout(() => {
          toastShown = false;
        }, 1000); 
      }
    },
    onError: (error) => {
      console.error("Error in deleting", error.message);

      if (!toastShown) {
        toast.error("Failed to delete product. Please try again.");
        toastShown = true;

        setTimeout(() => {
          toastShown = false;
        }, 3000);
      }
    },
  });
};
