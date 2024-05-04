import CookieServices from "./CookieServices";
import { axiosInstance } from "../api/axios.config.js";

export const getProductList = async () => {
  try {
    const { data } = await axiosInstance.get(
      `/api/products?populate=thumbnail,category`
    );
    return data;
  } catch (error) {
    console.error("Error fetching product list:", error);
    throw error;
  }
};

export const createProduct = async ({ body }) => {
  try {
    const { data } = await axiosInstance.post(
      `/api/products?populate=category,thumbnail`,
      body,
      {
        headers: {
          Authorization: `Bearer ${CookieServices.get("jwt")}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${CookieServices.get("jwt")}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const updateProduct = async ({ id, body }) => {
  try {
    const { data } = await axiosInstance.put(
      `/api/products/${id}?populate=thumbnail,category`,
      body,
      {
        headers: {
          Authorization: `Bearer ${CookieServices.get("jwt")}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};
