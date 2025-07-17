import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://13.233.76.146:5000",
  withCredentials: true 
});

export default axiosInstance;
