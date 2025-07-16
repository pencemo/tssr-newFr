import { studentsService } from "@/API/services/studentsService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useStudentOfStudyCenter = (page, limit, search, couresId, batchId, year, sortBy, studyCentre) => {
    return useQuery({
      queryKey: ["sudetnsOfStudyCenter", page, limit, search, couresId, batchId, year, sortBy, studyCentre],
      queryFn: () => studentsService.getAllStudentsOfStudyCenter(page, limit, search, couresId, batchId, year, sortBy, studyCentre),
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
    mutationFn: ({courseId, batchId, year, fields, studyCenter}) => {
      return studentsService.getStudentsForDl(courseId, batchId, year, fields, studyCenter)
    },
  });
}
export const useEditStudentData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return studentsService.editStudentData(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["oneStudent"]);
      queryClient.invalidateQueries(["sudetnsOfStudyCenter"]);
    }
  });
}



