import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000',
    withCredentials: true, // Important for HttpOnly cookies
});

// Optional: Interceptors for token refresh or global error handling

export default api;
