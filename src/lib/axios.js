import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://finance-tracker-rs09.onrender.com",
  withCredentials: true 
});

export default axiosInstance;
