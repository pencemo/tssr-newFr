import { studentsService } from "@/API/services/studentsService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useStudentOfStudyCenter = (page, limit, search, couresId, batchId, year, sortBy) => {
    return useQuery({
      queryKey: ["sudetnsOfStudyCenter", page, limit, search, couresId, batchId, year, sortBy],
      queryFn: () => studentsService.getAllStudentsOfStudyCenter(page, limit, search, couresId, batchId, year, sortBy),
      keepPreviousData: true,
    });
  };
export const useOneStudent = (id) => {
    return useQuery({
      queryKey: ["oneStudent", id],
      queryFn: () => studentsService.getOneStudent(id),
      keepPreviousData: false,
    });
  };


export const useStudentForDl = () => {
  return useMutation({
    mutationFn: ({courseId, batchId, year, fields}) => {
      return studentsService.getStudentsForDl(courseId, batchId, year, fields)
    },
  });
}


