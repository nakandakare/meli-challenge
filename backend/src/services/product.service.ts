import axios, { AxiosError, AxiosResponse } from "axios";
import {
  Categories,
  ProductDescription,
  ProductDetail,
  Products,
} from "../types/types";

export const MeliService = {
  getAllProducts: async (search: string): Promise<Products> => {
    const URL = `${process.env.MELI_API}/sites/MLA/search?q=${search}&limit=4`;

    try {
      const response: AxiosResponse<Products> = await axios.get(URL);
      return response.data;
    } catch (error) {
      throw new Error("Failed to perform products search");
    }
  },
  getProductDetail: async (productId: string): Promise<ProductDetail> => {
    const URL = `${process.env.MELI_API}/items/${productId}`;

    try {
      const response: AxiosResponse<ProductDetail> = await axios.get(URL);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch product detail");
    }
  },
  getProductDescription: async (
    productId: string
  ): Promise<ProductDescription> => {
    const URL = `${process.env.MELI_API}/items/${productId}/description`;

    try {
      const response: AxiosResponse<ProductDescription> = await axios.get(URL);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch product description");
    }
  },
  getProductCategories: async (id: string): Promise<Categories> => {
    const URL = `${process.env.MELI_API}/categories/${id}`;
    try {
      const response: AxiosResponse<Categories> = await axios.get(URL);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error;
        if (axiosError.response && axiosError.response.status === 404) {
          // If the response status is 404, return the empty categories
          return { path_from_root: [] };
        }
      }

      throw new Error("Failed to fetch product categories");
    }
  },
};
