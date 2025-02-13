const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3001';

export const authAPI = {
  login: async (credentials) => {
    const response = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },

  register: async (userData) => {
    const response = await fetch(`${API_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },

  getProfile: async (token) => {
    const response = await fetch(`${API_URL}/api/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },
};

export const productAPI = {
  getAllProducts: async () => {
    try {
      const response = await fetch(`${API_URL}/product`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      throw new Error('Error fetching products: ' + error.message);
    }
  },
  
  getProductsByCategory: async (categoryId) => {
    try {
      const response = await fetch(`${API_URL}/product?category_id=${categoryId}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      throw new Error('Error fetching products by category: ' + error.message);
    }
  },

  getProductsByCategoryAndSubcategory: async (categoryId, subcategoryId) => {
    try {
      const response = await fetch(`${API_URL}/product?category_id=${categoryId}&subcategory_id=${subcategoryId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error fetching filtered products');
      }
      return await response.json();
    } catch (error) {
      console.error('Error in getProductsByCategoryAndSubcategory:', error);
      throw error;
    }
  },

  getProductsBySubcategory: async (subcategoryId) => {
    try {
      const response = await fetch(`${API_URL}/product?subcategory_id=${subcategoryId}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      throw new Error('Error fetching products by subcategory: ' + error.message);
    }
  },

  getProductById: async (productId) => {
    try {
      const response = await fetch(`${API_URL}/product/${productId}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      throw new Error('Error fetching product: ' + error.message);
    }
  },
};

export const categoryAPI = {
  getAllCategories: async () => {
    try {
      const response = await fetch(`${API_URL}/category`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      throw new Error('Error fetching categories: ' + error.message);
    }
  },
  
  getSubcategoriesByCategory: async (categoryId) => {
    try {
      const response = await fetch(`${API_URL}/subcategory/category/${categoryId}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      throw new Error('Error fetching subcategories: ' + error.message);
    }
  }
};