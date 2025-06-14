import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../apiEndpoints";

export const authService = {
  login: async (credentials) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return response.data;
  },
  forgotPassword: async (email) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      email
    );
    return response.data;
  },
  verifyOTP: async (otp) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.AUTH.VERIFY_OTP,
      otp
    );
    return response.data;
  },
  resetPassword: async (newPassword) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.AUTH.RESET_PASSWORD,
      newPassword
    );
    return response.data;
  },
  logOut: async () => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.AUTH.LOGOUT,
    );
    return response.data;
  },
  getUser: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.AUTH.ISOUTH);
    return response.data;
},
};
