// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// ── Attach JWT to every request made through this instance ───────────────────
// Reads from localStorage each time so it always has the latest token,
// even after a fresh login without a page reload.
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Products ──────────────────────────────────────────────────────────────────
export const fetchProducts             = ()         => API.get('/products');
export const fetchProductsByCategory   = (category) => API.get(`/products/category/${category}`);
export const fetchProductById          = (id)       => API.get(`/products/${id}`);

// createProduct sends multipart/form-data (image upload via Cloudinary)
// Authorization header is attached automatically by the interceptor above.
// Do NOT manually set Content-Type here — axios sets it with the correct
// boundary when it detects FormData.
export const createProduct  = (formData) => API.post('/products', formData);
export const deleteProduct  = (id)       => API.delete(`/products/${id}`);

// ── Auth ──────────────────────────────────────────────────────────────────────
export const loginUser   = (email, password) => API.post('/auth/login', { email, password });
export const verifyToken = ()                => API.get('/auth/verify');

// ── Contact ───────────────────────────────────────────────────────────────────
export const sendContactMessage = (data) => API.post('/contact', data);

export default API;