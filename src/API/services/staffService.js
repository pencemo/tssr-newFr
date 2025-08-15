import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../apiEndpoints";

export const staffService = {
  createStaff: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.STAFF.CREATE_STAFF,
      data
    );
    return response.data;
  },
  getAllStaff: async (page, limit, search) => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.STAFF.GET_ALL_STAFF,
      {
        params: {
          page,
          limit,
          search,
        },
      }
    );
    return response.data;
  },
  
  getAllStaffsForDl: async () => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.STAFF.GET_ALL_STAFF_FOR_DL,
    );
    return response.data;
  },

  updateStaff: async (staffId, data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.STAFF.UPDATE_STAFF,
      data,
      {
        params: {
          staffId: staffId,
        },
      }
    );
    return response.data;
  },
  deleteStaff: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.STAFF.DELETE_STAFF,
      data
    );
    return response.data;
  },
};
