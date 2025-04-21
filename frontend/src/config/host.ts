// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  ME: `${API_BASE_URL}/auth/me`,

  // User endpoints
  USERS: `${API_BASE_URL}/users`,
  USER_ADDRESSES: `${API_BASE_URL}/users/addresses`,
  USER_DEFAULT_ADDRESS: `${API_BASE_URL}/users/default-address`,

  // Product endpoints
  PRODUCTS: `${API_BASE_URL}/products`,
  PRODUCT_BY_ID: (id: string) => `${API_BASE_URL}/products/${id}`,

  // Order endpoints
  ORDERS: `${API_BASE_URL}/orders`,
  ORDER_BY_ID: (id: string) => `${API_BASE_URL}/orders/${id}`,
  ORDER_STATUS: (id: string) => `${API_BASE_URL}/orders/${id}/status`,

  // WhatsApp endpoint
  WHATSAPP: `${API_BASE_URL}/whatsapp/send`,
};

// Environment configuration
export const ENV = {
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
  API_URL: API_BASE_URL,
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Meu E-commerce',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
};

// Default configuration
export const DEFAULT_CONFIG = {
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
  MAX_RETRY_DELAY: 5000, // 5 seconds
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Utility functions
export const utils = {
  // Format URL with query parameters
  formatUrl: (url: string, params?: Record<string, any>) => {
    if (!params) return url;
    const queryString = new URLSearchParams(params).toString();
    return `${url}?${queryString}`;
  },

  // Handle API errors
  handleError: (error: any) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }
    return error;
  },

  // Retry function for failed requests
  retry: async <T>(
    fn: () => Promise<T>,
    attempts: number = DEFAULT_CONFIG.RETRY_ATTEMPTS,
    delay: number = DEFAULT_CONFIG.RETRY_DELAY
  ): Promise<T> => {
    try {
      return await fn();
    } catch (error) {
      if (attempts === 0) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
      return utils.retry(fn, attempts - 1, Math.min(delay * 2, DEFAULT_CONFIG.MAX_RETRY_DELAY));
    }
  },

  // Get auth token from localStorage
  getAuthToken: () => {
    return localStorage.getItem('token');
  },

  // Set auth token in localStorage
  setAuthToken: (token: string) => {
    localStorage.setItem('token', token);
  },

  // Remove auth token from localStorage
  removeAuthToken: () => {
    localStorage.removeItem('token');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Get auth headers
  getAuthHeaders: () => {
    const token = utils.getAuthToken();
    return {
      ...DEFAULT_CONFIG.HEADERS,
      Authorization: token ? `Bearer ${token}` : '',
    };
  },
};

export default {
  API_ENDPOINTS,
  ENV,
  DEFAULT_CONFIG,
  utils,
}; 