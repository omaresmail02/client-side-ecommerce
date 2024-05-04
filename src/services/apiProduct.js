import axios from "axios";
import CookieServices from "./CookieServices";
import { axiosInstance } from "../api/axios.config.js";

console.log(axiosInstance);

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

console.log(import.meta.env.VITE_SERVER_URL);

export const createProduct = async ({ body }) => {
  try {
    const { data } = await axios.post(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/products?populate=category,thumbnail`,
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
    const { data } = await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/api/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${CookieServices.get("jwt")}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const updateProduct = async ({ id, body }) => {
  try {
    const { data } = await axios.put(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/products/${id}?populate=thumbnail,category`,
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
