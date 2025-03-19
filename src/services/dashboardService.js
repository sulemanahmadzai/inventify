const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Use environment variable
import axios from "axios";

export const dashboardService = {
  fetchInventoryStatus: async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/dashboard/inventory-status`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch inventory status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching inventory status:", error);
      throw error;
    }
  },
  fetchKPI: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard/kpis`);
      return response.data;
    } catch (error) {
      console.error("Error fetching KPI data:", error);
      throw error;
    }
  },
  /**
   * Fetch top products for a given period.
   * @param {string} period - The time period (daily, weekly, monthly).
   * @returns {Promise<object[]>} - The top products data.
   */
  fetchTopProducts: async (period) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/dashboard/top-products`,
        {
          params: { period },
        }
      );
      return response.data.data; // Adjust based on API response structure
    } catch (error) {
      console.error("Error fetching top products:", error);
      throw error;
    }
  },
  /**
   * Fetch recent activity data from the server.
   * @returns {Promise<object>} - Recent activity data including orders, users, and stock alerts.
   */
  fetchRecentActivity: async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/dashboard/recent-activity`
      );
      return response.data.data; // Adjust to match your API response structure
    } catch (error) {
      console.error("Error fetching recent activity data:", error);
      throw error;
    }
  },
};
