import axios, { type AxiosError, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';
import { storage } from './storage';

// Determinar la URL base de la API
let API_BASE_URL: string;

// Si estamos en desarrollo local, usar localhost
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  API_BASE_URL = 'http://localhost:8080/api';
} else {
  API_BASE_URL = `${import.meta.env.VITE_API_URL}api`;
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token automáticamente
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Si es error 401, probablemente el token expiró
    // Pero NO redirigir si es una petición de auth (login, register, reset-password, etc)
    const authRoutes = ['/auth/login', '/auth/register', '/auth/reset-password', '/auth/recover-password', '/auth/verify-email'];
    const isAuthRoute = authRoutes.some(route => (error.config?.url as string)?.includes(route));
    
    if (error.response?.status === 401 && !isAuthRoute) {
      storage.clearAuth();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
