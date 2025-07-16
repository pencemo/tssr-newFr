import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../apiEndpoints";

export const requestService = {
  requestCourse: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.REQUEST_COURSE.REQUEST_COURSE,
        data
      );
    return response.data;
  },
  changeStatus: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.REQUEST_COURSE.CHENGE_STATUS_OF_REQUEST_COURSE,
        data
      );
    return response.data;
  },
  getCourseForRequest: async () => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.REQUEST_COURSE.GET_COURSE_FOR_REQUEST
      );
    return response.data;
  },
  getRequestCourseForCenter: async () => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.REQUEST_COURSE.GET_REQUEST_COURSE_FOR_CENTER
      );
    return response.data;
  },
  getRequestCourseForAdmin: async () => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.REQUEST_COURSE.GET_REQUEST_COURSE_FOR_ADMIN
      );
    return response.data;
  },
  
  

};
