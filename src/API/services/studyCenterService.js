import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../apiEndpoints";

export const studyCentreService = {
  getStudyCenters: async (page, limit, search) => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.STUDY_CENTERS.VERIFIED,
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
  getOneSTC: async (id) => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.STUDY_CENTERS.GET_ONE,
      {
        params: {
          id,
        },
      }
    );
    return response.data;
  },
  createStudyCenter: async (studyCenter) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.STUDY_CENTERS.CREATE,
      studyCenter
    );
    return response.data;
  },
  updateStudyCenter: async (studyCenter, id) => {
    const response = await axiosInstance.put(
      API_ENDPOINTS.STUDY_CENTERS.UPDATE,
      studyCenter,
      {
        params: {
          id,
        },
      }
    );
    return response.data;
  },
  getStudyCenterForExcel: async () => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.STUDY_CENTERS.GET_STUDYCENTER_FOR_EXCEL
    );
    return response.data;
  },
  getCourseOfStudyCenter: async () => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.STUDY_CENTERS.COURSE_OF_STUDY_CENTER
    );
    return response.data;
  },
  getRequesCenter: async () => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.STUDY_CENTERS.GET_REQ_CENTER,
    );
    return response.data;
  },
  updateRequestCenter: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.STUDY_CENTERS.UPDATE_CENTER,data
    );
    return response.data;
  },
};

