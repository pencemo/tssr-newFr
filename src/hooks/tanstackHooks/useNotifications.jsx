import { notificationService } from "@/API/services/notificationService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateNotifications = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return notificationService.createNotification(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("notifications");
    },
  });
};

export const useAllNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: () => notificationService.getNotification(),
    keepPreviousData: true,
    refetchInterval: 60000 * 20,
  });
};

export const useDashboardData = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: () => notificationService.getDashbordData(),
    keepPreviousData: true,
  });
};

export const useDashboardDataOfCenter = () => {
  return useQuery({
    queryKey: ["dashboard-center"],
    queryFn: () => notificationService.getDashbordDataOfCenter(),
    keepPreviousData: true,
  });
};
