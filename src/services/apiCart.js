import axios from "axios";
import CookieServices from "./CookieServices";

export const getCartList = async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/cart`
    );
    return data;
  } catch (error) {
    console.error("Error fetching cart list:", error);
    throw error;
  }
};
