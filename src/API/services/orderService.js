import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../apiEndpoints";

export const orderServices = {
  createOrder: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.ORDER.CREATE_ORDER,
      data
    );
    return response.data;
  },

  updateOrderStatus: async ({ id, status }) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.ORDER.UPDATE_ORDER_STATUS,
      {},
      {
        params: { id, status },
      }
    );
    return response.data;
  },

  getAllOrders: async () => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.ORDER.GET_ALL_ORDERS
    );
    return response.data;
  },
  getOrderByStatus: async (page, limit, status, search) => {
    console.log(page, limit, status, search);
    const response = await axiosInstance.get(
      API_ENDPOINTS.ORDER.GET_ORDER_BY_STATUS,
      {
        params: { page, limit, status, search },
      }
    );
    
    return response.data;
  },
  getOrderOfAUser: async (page, limit) => {
    const response = await axiosInstance.get( 
      API_ENDPOINTS.ORDER.GET_ORDER_OF_A_USER,
      {
        params: { page, limit },
      }
    );
    return response.data;
  },
};
