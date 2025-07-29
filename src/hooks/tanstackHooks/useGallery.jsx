import { examSevice } from "@/API/services/examService";
import { galleryService } from "@/API/services/galleryService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const useAllGalleryPost = () => {
  return useQuery({
    queryKey: ["gallery"],
    queryFn: () => galleryService.getAllPost(),
    keepPreviousData: true,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return galleryService.createPost(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("gallery");
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return galleryService.editPost(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("gallery");
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return galleryService.deletePost(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("gallery");
    },
  });
};

