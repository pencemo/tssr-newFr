import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../apiEndpoints";

export const galleryService = {
  getAllPost: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.GALLERY.GET_ALL_POST );
    return response.data;
  },
  createPost: async (data) => {
    const response = await axiosInstance.post(API_ENDPOINTS.GALLERY.CREATE_POST, data );
    return response.data;
  },
  editPost: async (data) => {
    const response = await axiosInstance.post(API_ENDPOINTS.GALLERY.EDIT_POST, data );
    return response.data;
  },
  deletePost: async (id) => {
    const response = await axiosInstance.post(API_ENDPOINTS.GALLERY.DELETE_POST, id );
    return response.data;
  },
  
};
