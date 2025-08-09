// Utility functions for API calls

// Base URL for API requests
const API_BASE_URL = import.meta.env.PROD 
  ? import.meta.env.VITE_API_URL || 'https://your-render-app-url.onrender.com/api'
  : '/api';

// Generic fetch function with authentication
const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  
  // Log token for debugging (remove in production)
  console.log('Token from localStorage:', token);
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  };
  
  // Log the full request for debugging
  console.log('API Request:', {
    url: `${API_BASE_URL}${url}`,
    config
  });
  
  const response = await fetch(`${API_BASE_URL}${url}`, config);
  
  // Log the response for debugging
  console.log('API Response:', response);
  
  // Handle 401 Unauthorized responses
  if (response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }
  
  return response;
};

// Auth API calls
export const authAPI = {
  register: async (userData) => {
    const response = await fetchWithAuth('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    return response.json();
  },
  
  login: async (credentials) => {
    const response = await fetchWithAuth('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    return response.json();
  },
  
  getProfile: async () => {
    const response = await fetchWithAuth('/auth/profile');
    return response.json();
  }
};

// Land API calls
export const landAPI = {
  createLand: async (landData) => {
    const response = await fetchWithAuth('/land', {
      method: 'POST',
      body: JSON.stringify(landData)
    });
    return response.json();
  },
  
  getLands: async () => {
    const response = await fetchWithAuth('/land');
    return response.json();
  },
  
  getLand: async (id) => {
    const response = await fetchWithAuth(`/land/${id}`);
    return response.json();
  },
  
  updateLand: async (id, landData) => {
    const response = await fetchWithAuth(`/land/${id}`, {
      method: 'PUT',
      body: JSON.stringify(landData)
    });
    return response.json();
  },
  
  deleteLand: async (id) => {
    const response = await fetchWithAuth(`/land/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  },
  
  addCrop: async (id, cropData) => {
    const response = await fetchWithAuth(`/land/${id}/crops`, {
      method: 'POST',
      body: JSON.stringify(cropData)
    });
    return response.json();
  },
  
  addWaterUsage: async (id, waterData) => {
    const response = await fetchWithAuth(`/land/${id}/water`, {
      method: 'POST',
      body: JSON.stringify(waterData)
    });
    return response.json();
  }
};

// Government API calls
export const governmentAPI = {
  getAnalytics: async () => {
    const response = await fetchWithAuth('/government/analytics');
    return response.json();
  },
  
  getFarmers: async () => {
    const response = await fetchWithAuth('/government/farmers');
    return response.json();
  },
  
  getLands: async () => {
    const response = await fetchWithAuth('/government/lands');
    return response.json();
  }
};

// Error handling utility
export const handleAPIError = (error) => {
  console.error('API Error:', error);
  return error.message || 'An unexpected error occurred';
};

export default {
  authAPI,
  landAPI,
  governmentAPI,
  handleAPIError
};