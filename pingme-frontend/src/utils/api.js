import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('API Request:', {
      url: config.url,
      token: token ? 'Present' : 'Missing'
    });
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Added Authorization header:', config.headers.Authorization);
    }
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

export default api; 