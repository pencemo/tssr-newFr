import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../apiEndpoints";

export const resultService = {
  getStudenForResult: async (data) => {
    const response = await axiosInstance.post(API_ENDPOINTS.RESULT.GET_STUDETN_FOR_RESULT, data );
    return response.data;
  },
  uploadResult: async (data) => {
    const response = await axiosInstance.post(API_ENDPOINTS.RESULT.UPLOAD_RESULT, data );
    return response.data;
  },
  
};
