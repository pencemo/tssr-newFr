import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../apiEndpoints";

export const settingsService = {
  getSettings: async () => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.SETTINGS.GET_SETTINGS);
    return response.data;
  },
  toggleSettingsField: async (key) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.SETTINGS.TOGGLE_SETTINGS,
      {},
      {
        params: key
      }
      );
    return response.data;
  },
  updateAccountInfo: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.SETTINGS.UPDATE_ACCOUNT_INFO,
      data
      );
    return response.data;
  },
  updateCenterInfo: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.SETTINGS.EDIT_STUDY_CENTER,
      data
      );
    return response.data;
  },

};
