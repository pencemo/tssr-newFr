import { requestService } from "@/API/services/requestService";
import { studentsService } from "@/API/services/studentsService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const useCourseForRequest = () => {
    return useQuery({
      queryKey: ["courseForRequest", ],
      queryFn: () => requestService.getCourseForRequest(),
      keepPreviousData: false,
    });
  };

export const useRequestCourseForCenter = () => {
    return useQuery({
      queryKey: ["requestCourseForCenter", ],
      queryFn: () => requestService.getRequestCourseForCenter(),
      keepPreviousData: false,
    });
  };

export const useRequestCourseForAdmin = () => {
    return useQuery({
      queryKey: ["requestCourseForAdmin", ],
      queryFn: () => requestService.getRequestCourseForAdmin(),
      keepPreviousData: false,
    });
  };


export const useRequestCourse = () => {
    const queryClient=useQueryClient()
  return useMutation({
    mutationFn: (data) => {
      return requestService.requestCourse(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["requestCourseForCenter", "requestCourseForAdmin"]);
    }
  });
}

export const useChangeStatusOfRequestCourse = () => {
    const queryClient=useQueryClient()
  return useMutation({
    mutationFn: (data) => {
      return requestService.changeStatus(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["requestCourseForCenter", "requestCourseForAdmin"]);
    }
  });
}



