import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../apiEndpoints";

export const PDFService = {
    generatePDF: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.PDF.DL_PDF,
      data,
      {
        responseType: "blob", // Important
      }
    );
    return response;
  },

};
