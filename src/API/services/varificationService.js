import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../apiEndpoints";

export const varificationService = {
  getAllVarificationStudents: async (page, limit, search, status) => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.VERIFICATION_STUDENT.GET_VERIFICATION_STUDENT,
      {
        params: {
          page,
          limit,
          search,
          status
        },
      }
    );
    return response.data;
  },
  updateStatusOfVerification: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.VERIFICATION_STUDENT.UPDATE_STATUS_OF_VERIFICATION,
      data
    );
    return response.data;
  },
  
  
}; 
