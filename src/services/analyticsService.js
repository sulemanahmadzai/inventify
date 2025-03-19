const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Use Vite environment variable

export const analyticsService = {
  /**
   * Fetch analytics data for a specific time range.
   * @param {string} timeRange - The time range to fetch data for (e.g., "weekly", "monthly").
   * @returns {Promise<object>} - The analytics data.
   */
  async fetchAnalyticsData(timeRange = "weekly") {
    try {
      const response = await fetch(
        `${API_BASE_URL}/analytics?timeRange=${timeRange}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch analytics data: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error("Error in fetchAnalyticsData:", error);
      throw error;
    }
  },

  /**
   * Fetch inventory data with optional filters, sorting, and pagination.
   * @param {object} options - The options for the request.
   * @param {string} [options.timeRange="weekly"] - The time range to fetch data for.
   * @param {string} [options.search] - The search query.
   * @param {string} [options.sortField] - The field to sort by.
   * @param {string} [options.sortOrder] - The sort order ("asc" or "desc").
   * @param {string} [options.category] - The category to filter by.
   * @param {number} [options.limit] - The maximum number of results to return.
   * @param {number} [options.skip] - The number of results to skip (for pagination).
   * @returns {Promise<object>} - The inventory data.
   */
  async fetchInventoryData({
    timeRange = "weekly",
    search,
    sortField,
    sortOrder,
    category,
    limit,
    skip,
  } = {}) {
    try {
      const urlParams = new URLSearchParams();
      urlParams.set("timeRange", timeRange);

      if (search) urlParams.set("search", search);
      if (sortField) urlParams.set("sortField", sortField);
      if (sortOrder) urlParams.set("sortOrder", sortOrder);
      if (category) urlParams.set("category", category);
      if (typeof limit !== "undefined") urlParams.set("limit", limit);
      if (typeof skip !== "undefined") urlParams.set("skip", skip);

      const response = await fetch(
        `${API_BASE_URL}/analytics?${urlParams.toString()}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch inventory data: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error("Error in fetchInventoryData:", error);
      throw error;
    }
  },
};
