import { productService } from "@/API/services/productService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAllProduct = () => {
  return useQuery({
    queryKey: ["product"],
    queryFn: () => productService.getAllProducts(),
    keepPreviousData: true,
  });
};
export const useOneProduct = () => {
  return useQuery({
    queryKey: ["product"],
    queryFn: () => productService.getOneProduct(),
    keepPreviousData: true,
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return productService.addProduct(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("product");
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return productService.editProduct(data.id, data.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("product");
    },
  });
};
