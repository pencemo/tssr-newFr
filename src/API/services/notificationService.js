import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../apiEndpoints";

export const notificationService = {
  createNotification: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.NOTIFICATIONS.CREATE_NOTIFICATION,
      data,
    );
    return response.data;
  },
  getNotification: async () => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.NOTIFICATIONS.GET_NOTIFICATIONS,
    );
    return response.data;
  },
  getDashbordData: async () => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.DASHBOARD.GET_DATA,
    );
    return response.data;
  },
  getDashbordDataOfCenter: async () => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.DASHBOARD.GET_DATA_CENTER,
    );
    return response.data;
  },

};
