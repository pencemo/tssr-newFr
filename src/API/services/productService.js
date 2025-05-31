import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../apiEndpoints";

export const productService = {
  addProduct: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.PRODUCT.ADD_PRODUCT,
        data
      );
    return response.data;
  },
  editProduct: async (id, data) => {
    console.log(id, data);
   try{
    const response = await axiosInstance.post(
      API_ENDPOINTS.PRODUCT.UPDATE_PRODUCT,
      data,
      {
        params: {id}
      }
      );
    return response.data;
   }catch(err){
     console.log('update error', err);
   }
  },
  getOneProduct: async (id) => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.PRODUCT.GET_ONE_PRODUCT,
      {},
      {
        params: {id}
      }
      );
    return response.data;
  },
  getAllProducts: async () => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.PRODUCT.GET_ALL_PRODUCTS,
      );
    return response.data;
  },
  

};
