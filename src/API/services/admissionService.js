import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../apiEndpoints";

export const admissionService = {
  openAdmission: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.ADMISSION.OPEN_ADMISSION, 
      data
      );
    return response.data;
  },
  openAdmissionList: async (page, search, limit) => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.ADMISSION.OPENED_ADMISSION, 
      {
        params: {
          page: page,
          search,
          limit
        }
      }
      );
    return response.data;
  },
  closeAdmissionList: async (page, search, limit) => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.ADMISSION.CLOSED_ADMISSION, 
      {
        params: {
          page: page,
          search,
          limit
        }
      }
      );
    return response.data;
  },
  scheduledAdmissionList: async (page, search, limit) => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.ADMISSION.SHEDULED_ADMISSION, 
      {
        params: {
          page: page,
          search,
          limit
        }
      }
      );
    return response.data;
  },
  changeAdmissionStatus: async (id) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.ADMISSION.CHANGE_ADMISSION_STATUS,
      {text: 'nys'},
      {
        params: {
          batchId: id,
        }
      }
      );
    return response.data;
  },

//   createBatch: async (data, id) => {
//     const response = await axiosInstance.post(
//       API_ENDPOINTS.BATCH.CREATE,
//       data, 
//       {
//         params: {
//           courseId: id,
//         }
//       }
//     )
//     return response.data;
//   },


};
