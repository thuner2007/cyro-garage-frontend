import axios from "axios";
import Cookies from "js-cookie";

// Create an axios instance with the base URL from environment variables
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:7777",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add the JWT token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage only on client side
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // If we get a 401, clear the token and redirect to login
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      Cookies.remove("access_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
