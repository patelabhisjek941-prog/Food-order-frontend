import axios from "axios";
import { serverUrl } from "../App";

const axiosInstance = axios.create({
  baseURL: serverUrl,
  withCredentials: true,
});

// Attach token automatically to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

