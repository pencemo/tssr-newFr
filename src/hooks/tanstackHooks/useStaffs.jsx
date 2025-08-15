import { staffService } from "@/API/services/staffService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllStaffs = (page, limit, search) => {
    return useQuery({
      queryKey: ["staffs", page, limit, search],
      queryFn: () => staffService.getAllStaff(page, limit, search),
      keepPreviousData: false,
    });
  };

export const useGetAllStaffsForDl = () => {
    return useQuery({
      queryKey: ["staffsDl"],
      queryFn: () => staffService.getAllStaffsForDl(),
      keepPreviousData: false,
    });
  };



export const useCreateStaff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return staffService.createStaff(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("staffs");
    }
  });
}

export const useUpdateStaff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return staffService.updateStaff(data.id, data.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("staffs");
    }
  });
}

export const useDeleteStaff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return staffService.deleteStaff(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("staffs");
    }
  });
}



