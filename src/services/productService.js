import apiClient from "./apiClient";

const productService = {
  /**
   * Fetch all products.
   * @returns {Promise} - The list of all products.
   */
  getAllProducts: async () => {
    try {
      const response = await apiClient.get("/products");
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  /**
   * Fetch a single product by ID.
   * @param {string} id - The product ID.
   * @returns {Promise} - The product details.
   */
  getProductById: async (id) => {
    try {
      const response = await apiClient.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new product.
   * @param {object} data - The product data.
   * @returns {Promise} - The created product.
   */
  createProduct: async (data) => {
    try {
      const response = await apiClient.post("/products", data);
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  /**
   * Update an existing product.
   * @param {string} id - The product ID.
   * @param {object} data - The updated product data.
   * @returns {Promise} - The updated product.
   */
  updateProduct: async (id, data) => {
    try {
      const response = await apiClient.put(`/products/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating product with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete a product by ID.
   * @param {string} id - The product ID.
   * @returns {Promise} - The deletion result.
   */
  deleteProduct: async (id) => {
    try {
      const response = await apiClient.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting product with ID ${id}:`, error);
      throw error;
    }
  },
};

export default productService;
