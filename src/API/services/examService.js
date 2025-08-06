import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../apiEndpoints";

export const examSevice = {
  scheduleExam: async (data) => {
    const response = await axiosInstance.post(API_ENDPOINTS.EXAM.SCHEDULE_EXAM, data);
    return response.data;
  },
  deleteExam: async (data) => {
    const response = await axiosInstance.post(API_ENDPOINTS.EXAM.DELETE_SCHEDULED_EXAM, data);
    return response.data;
  },
  getScheduledExam: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.EXAM.GET_SCHEDULED_EXAMS);
    return response.data;
  },
  getScheduledExamOfStudyCenter: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.EXAM.GET_EXAM_OF_STUDY_CENTER);
    return response.data;
  },
  closeScheduledExam: async (data) => {
    const response = await axiosInstance.put(API_ENDPOINTS.EXAM.CLOSE_SCHEDULED_EXAM, data);
    return response.data;
  },
  downloadHallTicket: async (data) => {
    const response = await axiosInstance.post(API_ENDPOINTS.EXAM.DOWNLOAD_HALL_TICKET, data);
    return response.data;
  },
  getAllExams: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.EXAM.GET_ALL_EXAMS );
    return response.data;
  },
  


};
