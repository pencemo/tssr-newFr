import { studyCentreService } from "@/API/services/studyCenterService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useStudyCentre = (page, limit, search) => {
  return useQuery({
    queryKey: ["studycentre", page, limit, search],
    queryFn: () => studyCentreService.getStudyCenters(page, limit, search),
    keepPreviousData: true,
  });
};
export const useOneStudiCenter = (id) => {
  return useQuery({
    queryKey: ["oneSTC", id],
    queryFn: () => studyCentreService.getOneSTC(id),
    keepPreviousData: true,
  });
};

export const useCreateSutdyCenter = () => {
  const queryClient= useQueryClient();
return useMutation({
  mutationFn: (data) => {
    return studyCentreService.createStudyCenter(data);
  },
  onSuccess: () => {
    queryClient.invalidateQueries("studycentre");
  },
});
}

export const useUpdateSutdyCenter = () => {
  const queryClient= useQueryClient();
return useMutation({
  mutationFn: ({formData, id}) => {
    return studyCentreService.updateStudyCenter(formData, id);
  },
  onSuccess: () => {
    queryClient.invalidateQueries("studycentre");
  },
});
}

export const useUpdateSutdyCenterRequest = () => {
  const queryClient= useQueryClient();
return useMutation({
  mutationFn: (data) => {
    return studyCentreService.updateRequestCenter(data);
  },
  onSuccess: () => {
    queryClient.invalidateQueries("requestCentre");
  },
});
}


export const useGetRequestCenter = () => {
  return useQuery({
    queryKey: ["requestCentre",],
    queryFn: () => studyCentreService.getRequesCenter(),
    keepPreviousData: true,
  });
};


export const useGetStudyCenterForExcel = () => {
  return useQuery({
    queryKey: ["studycentre"],
    queryFn: () => studyCentreService.getStudyCenterForExcel(),
    keepPreviousData: true,
  });
};


export const useCourseOfStudyCenter = () => {
  return useQuery({
    queryKey: ["courseOfStudyCenter"],
    queryFn: () => studyCentreService.getCourseOfStudyCenter(),
    keepPreviousData: true,
  });
};