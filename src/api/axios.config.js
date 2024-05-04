import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://server-side-ecommerce-4.onrender.com",
});
