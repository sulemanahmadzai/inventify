const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Get the API base URL from environment variables

// Fetch sales data by region
export const salesService = {
  fetchRegionSales: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/sales/region-sales`);
      if (!response.ok) {
        throw new Error(`Failed to fetch region sales: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching region sales:", error);
      throw error;
    }
  },
};
