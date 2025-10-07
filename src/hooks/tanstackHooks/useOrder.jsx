import { orderServices } from "@/API/services/orderService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAllOrders = (status) => {
  return useQuery({
    queryKey: ["orders", status ],
    queryFn: () => orderServices.getAllOrders(status),
    keepPreviousData: true,
    enabled: false,
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

