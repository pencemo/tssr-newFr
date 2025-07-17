import { varificationService } from "@/API/services/varificationService";
import { studentsService } from "@/API/services/studentsService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAllVarificationStudents = (page, limit, search, status) => {
    return useQuery({
      queryKey: ["verificationStudent", page, limit, search, status],
      queryFn: () => varificationService.getAllVarificationStudents(page, limit, search, status),
      keepPreviousData: true,
    });
  };


export const useUpdateStatusofVerification = () => {
  const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data) => { return varificationService.updateStatusOfVerification(data)},
      onSuccess: () => {
        queryClient.invalidateQueries(["verificationStudent"]);
      },
    })
  };
