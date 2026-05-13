import apiClient from '../utils/apiClient';
import type { AuthResponse, User } from '../types/auth.types';

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', { email, password });
    // El backend retorna {success, data, message}, extraemos data
    return response.data.data;
  },

  register: async (email: string, password: string, name: string, faculty?: string): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/register', {
      email,
      password,
      name,
      faculty,
    });
    // El backend retorna {success, data, message}, extraemos data
    return response.data.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },

  verifyEmail: async (token: string): Promise<any> => {
    const response = await apiClient.get(`/auth/verify-email/${token}`);
    return response.data;
  },

  recoverPassword: async (email: string): Promise<any> => {
    const response = await apiClient.post('/auth/recover-password', { email });
    return response.data;
  },

  resetPassword: async (token: string, newPassword: string): Promise<any> => {
    const response = await apiClient.post('/auth/reset-password', { token, newPassword });
    return response.data;
  },

  logout: () => {
    // El logout es local, solo limpiar datos
    return Promise.resolve();
  },
};
