import { authService } from "@/API/services/authService";
import { settingsService } from "@/API/services/settingsService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => authService.getUser(),
    keepPreviousData: true,
  });
};

export const useSettings = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: () => settingsService.getSettings(),
  });
};


export const useLogin = () => {
  const queryClient= useQueryClient();
return useMutation({
  mutationFn: (data) => {
    return authService.login(data);
  },
  onSuccess: () => {
    queryClient.invalidateQueries("user");
  },
});
}


