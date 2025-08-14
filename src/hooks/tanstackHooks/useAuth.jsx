import { authService } from "@/API/services/authService";
import { settingsService } from "@/API/services/settingsService";
import { studyCentreService } from "@/API/services/studyCenterService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => authService.getUser(),
    keepPreviousData: true,
    refetchOnMount: false,
  });
};

export const useSettings = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: () => settingsService.getSettings(),
    refetchOnWindowFocus:true,
    refetchOnMount: false,
  });
};

export const useToggleSettings = () => {
  const queryClient= useQueryClient();
return useMutation({
  mutationFn: (data) => {
    return settingsService.toggleSettingsField(data);
  },
  onSuccess: () => {
    queryClient.invalidateQueries("settings");
  },
});
}

export const useLogin = () => {
  const queryClient= useQueryClient();
return useMutation({
  mutationFn: (data) => {
    return authService.login(data);
  },
  onSuccess: () => {
    queryClient.invalidateQueries("user");
  },
});
}

export const useUpdateInfo = () => {
  const queryClient= useQueryClient();
return useMutation({
  mutationFn: (data) => {
    return settingsService.updateAccountInfo(data);
  },
  onSuccess: () => {
    queryClient.invalidateQueries("user");
  },
});
}

export const useUpdateInfoStudyCenter = () => {
  const queryClient= useQueryClient();
return useMutation({
  mutationFn: (data) => {
    return settingsService.updateCenterInfo(data);
  },
  onSuccess: () => {
    queryClient.invalidateQueries("user");
  },
});
}

export const useSendOTP = () => {
return useMutation({
  mutationFn: (data) => {
    return authService.forgotPassword(data);
  },
});
}

export const useVerifyOTP = () => {
return useMutation({
  mutationFn: (data) => {
    return authService.verifyOTP(data);
  },
});
}

export const useResetPassword = () => {
return useMutation({
  mutationFn: (data) => {
    return authService.resetPassword(data);
  },
});
}