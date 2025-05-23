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
  getUser: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.AUTH.ISOUTH);
    return response.data;
},
};
