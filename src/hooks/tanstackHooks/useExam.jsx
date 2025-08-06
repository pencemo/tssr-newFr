import { examSevice } from "@/API/services/examService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useSceduleExam = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return examSevice.scheduleExam(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("exam-sceduled");
    },
  });
};

export const useCloseScheduledExam = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return examSevice.closeScheduledExam(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("exam-sceduled");
    },
  });
};

export const useDeleteExam = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return examSevice.deleteExam(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("exam-sceduled");
    },
  });
};

export const useGetScheduledEXam = () => {
  return useQuery({
    queryKey: ["exam-sceduled"],
    queryFn: () => examSevice.getScheduledExam(),
    keepPreviousData: true,
  });
};

export const useGetExamOfCenter = () => {
  return useQuery({
    queryKey: ["exam-sceduled"],
    queryFn: () => examSevice.getScheduledExamOfStudyCenter(),
    keepPreviousData: true,
  });
};

export const useDlHallTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return examSevice.downloadHallTicket(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("hall-ticket");
    },
  });
};

export const useGetAllExams = () => {
  return useQuery({
    queryKey: ["all-exam"],
    queryFn: () => examSevice.getAllExams(),
    keepPreviousData: true,
  });
};