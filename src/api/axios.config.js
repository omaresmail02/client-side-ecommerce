import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://server-side-eureka.vercel.app/api/v1",
});
