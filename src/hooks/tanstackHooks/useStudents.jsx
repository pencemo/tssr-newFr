import { studentsService } from "@/API/services/studentsService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useStudentOfStudyCenter = (page, limit, search, couresId, batchId, year, sortBy) => {
    return useQuery({
      queryKey: ["sudetnsOfStudyCenter", page, limit, search, couresId, batchId, year, sortBy],
      queryFn: () => studentsService.getAllStudentsOfStudyCenter(page, limit, search, couresId, batchId, year, sortBy),
      keepPreviousData: true,
    });
  };


// export const useCreateCourse = () => {
//   const queryClient= useQueryClient();
// return useMutation({
//   mutationFn: (data) => {
//     return courseService.createCourse(data);
//   },
//   onSuccess: () => {
//     queryClient.invalidateQueries("coures");
//   },
// });
// }


