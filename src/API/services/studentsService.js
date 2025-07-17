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
  getOneStudent: async (id, isEnrolled) => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.STUDENTS.GET_ONE_STUDENT,
      {
        params: {
         id,
         isEnrolled
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
  editStudentData: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.STUDENTS.UPDATE_STUDENT_DATA,
      {
        data
      }
    );
    return response.data;
  },
  
}; 

export const useUpdateStudent = () => {
  // return useMutation({
  //   mutationFn: async ({ id, data }) => {
  //     const response = await axios.put(`/api/students/${id}`, data);
  //     return response.data;
  //   },
  // });
};