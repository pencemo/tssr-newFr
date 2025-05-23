import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../apiEndpoints";

export const studentsService = {
  getAllStudentsOfStudyCenter: async (page, limit, search, courseId, batchId, year, sortBy) => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.STUDENTS.ALL_STUDENTS_OF_STUDY_CENTER,
      {
        params: {
          page,
          limit,
          search,
          courseId, batchId, year, sortBy
        },
      }
    );
    return response.data;
  },
  
};

