import { resultService } from "@/API/services/resultService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


// export const useGetAllStaffsForDl = () => {
//     return useQuery({
//       queryKey: ["staffsDl"],
//       queryFn: () => staffService.getAllStaffsForDl(),
//       keepPreviousData: false,
//     });
//   };



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
    mutationFn: (data) => {
      return resultService.uploadResult(data?.resultsArray);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("results");
    }
  });
}




