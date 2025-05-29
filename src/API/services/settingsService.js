import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../apiEndpoints";

export const settingsService = {
  getSettings: async () => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.SETTINGS.GET_SETTINGS);
    return response.data;
  },

};
