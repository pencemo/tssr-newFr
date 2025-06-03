import { orderServices } from "@/API/services/orderService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAllOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => orderServices.getAllOrders(),
    keepPreviousData: true,
  });
};
export const useGetOrderByStatus = ({ page, limit, status, search }) => {
  return useQuery({
    queryKey: ["orders-status", status, page, limit, search],
    queryFn: () => orderServices.getOrderByStatus(page, limit, status, search),
    keepPreviousData: true,
  });
};


export const useOrderOfUser = (currentPage,limit) => {
  return useQuery({
    queryKey: ["orders",currentPage,limit],
    queryFn: () => orderServices.getOrderOfAUser(currentPage,limit),
    keepPreviousData: true,
  });
};


export const useCreateOrders = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return orderServices.createOrder(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("orders");
    },
  });
};

// hooks/tanstackHooks/useOrder.js
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => {
      return orderServices.updateOrderStatus({ id, status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("orders");
    },
  });
};

