import { useQueryClient,useMutation } from "@tanstack/react-query";
import { updateProductById } from "../api/productApi";
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProductById,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["products"], (oldData) => {
        if (!oldData) return [];

        return oldData.map((item) =>
          item.id === variables.id ? { ...item, ...data } : item
        );
      });

      toast.success("Product updated successfully");
    },
    onError: (error) => {
      console.error("Update failed:", error.message);
      toast.error("Failed to update product.");
    },
  });
};
