import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../apiEndpoints";

export const studentsService = {
  getAllStudentsOfStudyCenter: async (page, limit, search, courseId, batchId, year, sortBy, studyCentre) => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.STUDENTS.ALL_STUDENTS_OF_STUDY_CENTER,
      {
        params: {
          page,
          limit,
          search,
          courseId, batchId, year, sortBy, studyCentre
        },
      }
    );
    return response.data;
  },
  getOneStudent: async (id) => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.STUDENTS.GET_ONE_STUDENT,
      {
        params: {
         id
        },
      }
    );
    return response.data;
  },
  getStudentsForDl: async (courseId, batchId, year, fields, studycenterId) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.STUDENTS.STUDENT_FOR_DL,
      {
        courseId, batchId, year, fields, studycenterId
      }
    );
    return response.data;
  },
  
}; 

