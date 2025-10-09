import { admissionService } from "@/API/services/admissionService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useOpenAdmissinList = (page, search, limit) => {
  return useQuery({
    queryKey: ["admissions_open", page, search, limit ],
    queryFn: () => admissionService.openAdmissionList(page, search, limit),
    keepPreviousData: true,
  });
};


export const useScheduledAdmissinList = (page, search, limit) => {
  return useQuery({
    queryKey: ["admissions_scheduled", page, search, limit ],
    queryFn: () => admissionService.scheduledAdmissionList(page, search, limit),
    keepPreviousData: true,
  });
};

export const useClosedAdmissinList = (page, search, limit) => {
  return useQuery({
    queryKey: ["admissions_closed", page, search, limit ],
    queryFn: () => admissionService.closeAdmissionList(page, search, limit),
    keepPreviousData: true,
  });
};

export const useOpenAdmission = () => {
  const queryClient= useQueryClient();
return useMutation({
  mutationFn: ({data}) => {
    return admissionService.openAdmission(data);
  },
  onSuccess: () => {
    queryClient.invalidateQueries(["admissions", 'batch', 'admissions_open', 'admissions_scheduled', 'admissions_closed']);
    // queryClient.invalidateQueries("batch");
  },
});
}

export const useChangeStatusAdmission = () => {
  const queryClient= useQueryClient();
return useMutation({
  mutationFn: ({id}) => {
    return admissionService.changeAdmissionStatus(id);
  },
  onSuccess: () => {
    queryClient.invalidateQueries(["admissions", 'batch', 'admissions_open', 'admissions_scheduled', 'admissions_closed']);
    // queryClient.invalidateQueries("batch");
  },
});
}



