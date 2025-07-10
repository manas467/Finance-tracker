import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://finance-tracker-1-vkcv.onrender.com",
  withCredentials: true 
});

export default axiosInstance;
