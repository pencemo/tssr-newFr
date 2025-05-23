import { subjectServices } from "@/API/services/subjectService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAllSubjects = () => {
  return useQuery({
    queryKey: ["subjects", ],
    queryFn: () => subjectServices.getSubjects(),
    keepPreviousData: true,
  });
};

// export const useCreateSutdyCenter = () => {
//   const queryClient= useQueryClient();
// return useMutation({
//   mutationFn: (data) => {
//     return studyCentreService.createStudyCenter(data);
//   },
//   onSuccess: () => {
//     queryClient.invalidateQueries("studycentre");
//   },
// });
// }
