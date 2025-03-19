const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Dynamic API base URL

// Helper function for headers
const getHeaders = (isJson = true) => {
  const headers = {};
  if (isJson) headers["Content-Type"] = "application/json";
  return headers;
};

// Centralized fetch with error handling
const fetchWithErrorHandling = async (url, options = {}) => {
  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Something went wrong");
  }
  return data;
};

export const userService = {
  /**
   * Fetch a list of users with optional filters and pagination.
   * @param {number} page - The page number.
   * @param {string} [search] - Search query for users.
   * @param {string} [role="all"] - User role filter.
   * @param {string} [accountStatus="all"] - Account status filter.
   * @returns {Promise<object>} - The paginated list of users.
   */
  getUsers: async (page, search, role = "all", accountStatus = "all") => {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      ...(search && { search }),
      ...(role !== "all" && { role }),
      ...(accountStatus !== "all" && { accountStatus }),
    });

    return fetchWithErrorHandling(`${API_BASE_URL}/users?${queryParams}`);
  },

  /**
   * Add a new user.
   * @param {object} userData - The data of the user to create.
   * @returns {Promise<object>} - The created user data.
   */
  addUser: async (userData) => {
    return fetchWithErrorHandling(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        ...userData,
        personalDetails: {
          phoneNumber: userData.phoneNumber,
          country: userData.country,
          city: userData.city,
          state: userData.state,
          postalCode: userData.postalCode,
        },
      }),
    });
  },

  /**
   * Delete a user by ID.
   * @param {string} userId - The ID of the user to delete.
   * @returns {Promise<object>} - The result of the deletion.
   */
  deleteUser: async (userId) => {
    return fetchWithErrorHandling(`${API_BASE_URL}/users/${userId}`, {
      method: "DELETE",
    });
  },

  /**
   * Get a user's details by ID.
   * @param {string} userId - The ID of the user.
   * @returns {Promise<object>} - The user's details.
   */
  getUserById: async (userId) => {
    const data = await fetchWithErrorHandling(
      `${API_BASE_URL}/users/${userId}`
    );
    return {
      ...data,
      phoneNumber: data.personalDetails?.phoneNumber || "",
      country: data.personalDetails?.country || "",
      city: data.personalDetails?.city || "",
      state: data.personalDetails?.state || "",
      postalCode: data.personalDetails?.postalCode || "",
    };
  },

  /**
   * Update a user's details.
   * @param {string} userId - The ID of the user to update.
   * @param {object} userData - The updated user data.
   * @returns {Promise<object>} - The updated user data.
   */
  updateUser: async (userId, userData) => {
    return fetchWithErrorHandling(`${API_BASE_URL}/users/${userId}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({
        ...userData,
        personalDetails: {
          phoneNumber: userData.phoneNumber,
          country: userData.country,
          city: userData.city,
          state: userData.state,
          postalCode: userData.postalCode,
        },
      }),
    });
  },

  /**
   * Update a user's role and account status.
   * @param {string} userId - The ID of the user.
   * @param {string} role - The new role for the user.
   * @param {string} accountStatus - The new account status for the user.
   * @returns {Promise<object>} - The updated role and status.
   */
  updateUserRoleAndStatus: async (userId, role, accountStatus) => {
    return fetchWithErrorHandling(
      `${API_BASE_URL}/users/${userId}/role-status`,
      {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ role, accountStatus }),
      }
    );
  },
};
