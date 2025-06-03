import { subjectServices } from "@/API/services/subjectService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAllSubjects = () => {
  return useQuery({
    queryKey: ["subjects", ],
    queryFn: () => subjectServices.getSubjects(),
    keepPreviousData: true,
  });
};
export const useAllTrueAndFalseSubjects = () => {
  return useQuery({
    queryKey: ["subjects"],
    queryFn: () => subjectServices.getAllTrueAndFalseSubjects(),
    keepPreviousData: true,
  });
};

export const useCreateSubjects = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return subjectServices.createSubjects(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("subjects");
    },
  });
};
export const useUpdateSubjects = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      console.log(data);
      return subjectServices.updateSubjects(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("subjects");
    },
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
