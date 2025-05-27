import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../apiEndpoints";

export const courseService = {
  getCourses: async () => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.COURSE.GET_ALL);
    return response.data;
  },
  getOpenCourseAndBatchOfStudyCenter: async () => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.COURSE.GET_ADMOPENED_COURSE_AND_BATCH_OF_STUDY_CENTER
    );
    return response.data;
  },
//   getStudyCenters: async (page, limit, search) => {
//     const response = await axiosInstance.get(
//       API_ENDPOINTS.STUDY_CENTERS.VERIFIED,
//       {
//         params: {
//           page,
//           limit,
//           search,
//         },
//       }
//     );
//     return response.data;
//   },
  createCourse: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.COURSE.ADD_COURSE,
      data
    )
    return response.data;
  },
  updateCourse: async (data, id) => {
    const response = await axiosInstance.put(
      API_ENDPOINTS.COURSE.EDIT,
      data,
      {
        params: {
          id: id,
        }
      }
    )
    return response.data;
  }
};
