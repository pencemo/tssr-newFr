import { courseService } from "@/API/services/courseService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAllCourse = () => {
  return useQuery({
    queryKey: ["coures", ],
    queryFn: () => courseService.getCourses(),
    keepPreviousData: true,
  });
};


export const useCreateCourse = () => {
  const queryClient= useQueryClient();
return useMutation({
  mutationFn: (data) => {
    return courseService.createCourse(data);
  },
  onSuccess: () => {
    queryClient.invalidateQueries("coures");
  },
});
}

export const useUpdateCourse = () => {
  const queryClient= useQueryClient();
return useMutation({
  mutationFn: ({formData, id}) => {
    return courseService.updateCourse(formData, id);
  },
  onSuccess: () => {
    queryClient.invalidateQueries("coures");
  },
});
}

// export const useLogin = () => {
//   const queryClient= useQueryClient();
// return useMutation({
//   mutationFn: (data) => {
//     return authService.login(data);
//   },
//   onSuccess: () => {
//     queryClient.invalidateQueries("user");
//   },
// });
// }


