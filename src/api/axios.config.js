import axios from "axios";
axios.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2))
  return request
})

axios.interceptors.response.use(response => {
  console.log('Response:', JSON.stringify(response, null, 2))
  return response
})


export const axiosInstance = axios.create({
  //baseURL: "https://server-side-eureka.vercel.app/api/v1",
  baseURL: "http://localhost:8000/api/"
});
