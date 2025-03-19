const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Use environment variable
const API_URL = `${API_BASE_URL}/users`; // Full API endpoint for users

// Helper function for headers
const getHeaders = (isJson = true) => {
  const headers = {};
  if (isJson) headers["Content-Type"] = "application/json";
  return headers;
};

// Centralized fetch helper with error handling
const fetchWithErrorHandling = async (url, options = {}) => {
  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Something went wrong");
  }
  return data;
};

// Service functions
export const usersService = {
  /**
   * Fetch all users.
   * @returns {Promise<object[]>} - List of users.
   */
  fetchUsers: async () => {
    return fetchWithErrorHandling(API_URL);
  },

  /**
   * Create a new user.
   * @param {object} userData - The data of the user to create.
   * @returns {Promise<object>} - The created user.
   */
  createUser: async (userData) => {
    return fetchWithErrorHandling(API_URL, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(userData),
    });
  },

  /**
   * Update an existing user.
   * @param {string} id - The ID of the user to update.
   * @param {object} userData - The updated user data.
   * @returns {Promise<object>} - The updated user.
   */
  updateUser: async (id, userData) => {
    return fetchWithErrorHandling(`${API_URL}/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(userData),
    });
  },

  /**
   * Delete a user by ID.
   * @param {string} id - The ID of the user to delete.
   * @returns {Promise<object>} - The result of the deletion.
   */
  deleteUser: async (id) => {
    return fetchWithErrorHandling(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  },
};
