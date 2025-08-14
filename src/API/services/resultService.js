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
  deleteResult: async (data) => {
    const response = await axiosInstance.post(API_ENDPOINTS.RESULT.DELETE_RESULT, data );
    return response.data;
  },
  checkResult: async (data) => {
    const response = await axiosInstance.post(API_ENDPOINTS.RESULT.RESULT_CHECK, data );
    return response.data;
  },
  getAllResult: async (search, page, limit) => {
    const response = await axiosInstance.get(API_ENDPOINTS.RESULT.GET_ALL_RESULT, 
      {
        params: {
          page,
          limit,
          search,
        },
      } );
    return response.data;
  },
  
};
