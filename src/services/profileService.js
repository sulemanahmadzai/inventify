const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Use environment variable

// Helper function to get headers with Authorization
const getHeaders = (isJson = true) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  if (isJson) headers["Content-Type"] = "application/json";
  return headers;
};

// Centralized fetch helper
const fetchWithErrorHandling = async (url, options = {}) => {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong.");
  }

  return data;
};

export const profileService = {
  /**
   * Fetch the user's profile.
   * @returns {Promise<object>} - The user's profile data.
   */
  fetchProfile: async () => {
    return fetchWithErrorHandling(`${API_BASE_URL}/profile`, {
      headers: getHeaders(),
    });
  },

  /**
   * Update the user's profile.
   * @param {object} profileData - The profile data to update.
   * @returns {Promise<object>} - The updated profile data.
   */
  updateProfile: async (profileData) => {
    return fetchWithErrorHandling(`${API_BASE_URL}/profile`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(profileData),
    });
  },

  /**
   * Change the user's password.
   * @param {object} passwordData - The password change data.
   * @returns {Promise<object>} - The result of the password change.
   */
  changePassword: async (passwordData) => {
    return fetchWithErrorHandling(`${API_BASE_URL}/profile/change-password`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(passwordData),
    });
  },
};
