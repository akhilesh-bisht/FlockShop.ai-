import axios from "axios";

// Base API configuration
const api = axios.create({
  baseURL: "http://localhost:4500/api",
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authApi = {
  login: async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  signup: async (email, password) => {
    try {
      const response = await api.post("/auth/register", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

// Wishlist API

export const wishlistApi = {
  getAllWishlists: async () => {
    try {
      const response = await api.get("/wishlists");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  //  get wishlists by user id

  getWishlistById: async (id) => {
    try {
      const response = await api.get(`/wishlists/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  //  create a wishlist
  createWishlist: async (data) => {
    try {
      const response = await api.post("/wishlists", data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // update wishlist title
  updateWishlistTitle: async (id, title) => {
    try {
      const response = await api.put(`/wishlists/${id}`, { title });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  //  delete wishlist
  deleteWishlist: async (id) => {
    try {
      const response = await api.delete(`/wishlists/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  //  add collaborator
  addCollaborator: async (wishlistId, userId) => {
    try {
      const response = await api.put(
        `/wishlists/${wishlistId}/add-collaborator`,
        { userId }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  //  remove collaborator
  removeCollaborator: async (productId, userId) => {
    try {
      const response = await api.delete(
        `/wishlists/${productId}/remove-collaborator`,
        { userId }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

// Product API

export const productApi = {
  getProductsByWishlistId: async (wishlistId) => {
    try {
      const response = await api.get(`/products/wishlist/${wishlistId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  addProduct: async (productData) => {
    console.log(productData);

    try {
      const response = await api.post(`/products`, productData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateProduct: async (productId, productData) => {
    try {
      const response = await api.put(`/products/${productId}`, productData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteProduct: async (productId) => {
    try {
      const response = await api.delete(`/products/${productId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default api;
