import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Use environment variable

export const authService = {
  login: async (formData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      throw (
        error.response?.data || {
          message: "An error occurred. Please try again.",
        }
      );
    }
  },

  googleLogin: async (credential) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/google-login`,
        { token: credential },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      console.error("Error during Google login:", error);
      throw (
        error.response?.data || {
          message: "An error occurred during Google login.",
        }
      );
    }
  },
  register: async (formData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/register`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error during registration:", error);
      throw (
        error.response?.data || {
          message: "An error occurred. Please try again.",
        }
      );
    }
  },

  googleRegister: async (credential) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/google-register`,
        { token: credential },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      console.error("Error during Google registration:", error);
      throw (
        error.response?.data || {
          message: "An error occurred during Google registration.",
        }
      );
    }
  },
};
