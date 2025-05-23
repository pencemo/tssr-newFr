import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../apiEndpoints";

export const batchService = {
  getBatchesOfCourse: async (id) => {
    const response = await axiosInstance.get(API_ENDPOINTS.BATCH.GET_COURSE, {
      params: {
        courseId: id,
      },
    });
    return response.data;
  },
  getOpenBatchesOfCourse: async (id) => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.BATCH.GET_OPEN_BATCHES_OF_COURSE,
      {
        params: {
          courseId: id,
        },
      }
    );
    return response.data;
  },

  createBatch: async (data, id) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.BATCH.CREATE,
      data,
      {
        params: {
          courseId: id,
        },
      }
    );
    return response.data;
  },

  updateStatus: async (data, id) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.BATCH.UPDATE_STATUS,
      data,
      {
        params: {
          batchId: id,
        },
      }
    );
    return response.data;
  },

  getOpenBatchesOfStudyCenter: async () => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.BATCH.GET_OPEN_BATCHES_OF_STUDY_CENTER,
    );
    return response.data;
  },
  //   updateCourse: async (data, id) => {
  //     const response = await axiosInstance.put(
  //       API_ENDPOINTS.COURSE.EDIT,
  //       data,
  //       {
  //         params: {
  //           id: id,
  //         }
  //       }
  //     )
  //     return response.data;
  //   }
};
