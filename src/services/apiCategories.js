import axios from "axios";
import CookieServices from "./CookieServices";

export const getCategoriesList = async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/categories`
    );
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const createCategory = async ({ body }) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/categories`,
      body,
      {
        headers: {
          Authorization: `Bearer ${CookieServices.get("jwt")}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/api/categories/${id}`,
      {
        headers: {
          Authorization: `Bearer ${CookieServices.get("jwt")}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
