import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://finance-tracker-2-bbko.onrender.com"
      : "http://localhost:5000",
  withCredentials: true,
});

export default axiosInstance;
