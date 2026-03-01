import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
});

// Token will be added automatically via the default header set in AuthContext
export const fetchProducts = () => API.get('/products');
export const fetchProductsByCategory = (category) => API.get(`/products/category/${category}`);
export const fetchProductById = (id) => API.get(`/products/${id}`);
// Protected calls (admin only)
export const createProduct = (formData) => API.post('/products', formData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);