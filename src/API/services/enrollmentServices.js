import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../apiEndpoints";

export const enrollmentServices = {
  checkEnrolledOrNot: async (adhaarNumber) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.ENROLLMENT.CHECK_ENROLLED,
      adhaarNumber,
      
    );
    return response.data;
  },
  // createStudent: async (submissionData) => {
  //   const response = await axiosInstance.post(
  //     API_ENDPOINTS.ENROLLMENT.CREATE_STUDENT,
  //     submissionData,
  //     {
  //       headers: {
  //         // Fixed: 'headers' (plural) instead of 'header'
  //         "Content-Type": "multipart/form-data", // Proper header format
  //       },
  //     }
  //   );
  //   return response.data;
  // },
  createEnrollmentAndStudent: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.ENROLLMENT.CREATE_STUDENT_AND_ENROLLMENT,
      data,
    );
    return response.data;
  },
  createEnrollmentUsingExcel: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.ENROLLMENT.EXCEL_ENROLLMENT,
      data
    );
    return response.data;
  },
  bulkEnrollStudents: async (
    newStudents,
    pendingEnrollmentStudents,
    course
  ) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.ENROLLMENT.BULK_ENROLL,
      newStudents,
      pendingEnrollmentStudents,
      course
    );
    return response.data;
  },
};