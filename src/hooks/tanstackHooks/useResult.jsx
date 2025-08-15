import { resultService } from "@/API/services/resultService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const useGetAllResutl = (search, page, limit, filter) => {
  return useQuery({
    queryKey: ["results", search, page, limit, filter],
    queryFn: () => resultService.getAllResult(search, page, limit, filter),
    keepPreviousData: false,
  });
};



export const useGetStudentForResult = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return resultService.getStudenForResult(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("student_data_for_result");
    }
  });
}

export const useUploadResult = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => {
      return resultService.uploadResult(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("results");
    },
  });
}

export const useDeleteResults = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return resultService.deleteResult(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("results");
    }
  });
}

export const useResultCheck = () => {
  return useMutation({
    mutationFn: (data) => {
      return resultService.checkResult(data);
    }
  });
};