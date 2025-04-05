/**
 * API configuration file
 * Centralizes the backend API URL for easier environment switching
 */

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://todo-list-backend-z2o4.onrender.com' 
  : 'http://localhost:5000';

export default API_BASE_URL;
