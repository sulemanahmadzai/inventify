import axios from "axios";

// Get the base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create an instance of axios with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL, // Dynamically set base URL
  timeout: 10000, // Timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercept requests for adding tokens
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Assuming token is stored in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercept responses for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      // Handle global errors like authentication failures
      if (status === 401) {
        console.error("Unauthorized! Redirecting to login...");
        // Clear token and redirect to login
        localStorage.removeItem("authToken");
        window.location.href = "/login"; // Update with your login route
      } else if (status >= 500) {
        console.error("Server error! Please try again later.");
      }
    } else {
      // Handle network errors
      console.error("Network error! Please check your connection.");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
