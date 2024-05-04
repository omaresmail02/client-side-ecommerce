import axios from "axios";
import CookieServices from "./CookieServices";

export const getReviewsList = async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/reviews?populate=product`
    );
    return data;
  } catch (error) {
    console.error("Error fetching reviews list:", error);
    throw error;
  }
};

export const createReview = async ({ body }) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/reviews`,
      body,
      {
        headers: {
          Authorization: `Bearer ${CookieServices.get("jwt")}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};

export const deleteReview = async (id) => {
  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/api/reviews/${id}`,
      {
        headers: {
          Authorization: `Bearer ${CookieServices.get("jwt")}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};

export const updateReview = async ({ id, body }) => {
  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/api/reviews/${id}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${CookieServices.get("jwt")}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
};
