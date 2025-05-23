import { authService } from "@/API/services/authService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => authService.getUser(),
    keepPreviousData: true,
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


