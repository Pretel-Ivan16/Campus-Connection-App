import { createContext, useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { AuthContextType, User } from '../types/auth.types';
import { authService } from '../services/auth.service';
import { storage } from '../utils/storage';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Verificar si hay sesión guardada al montar el componente
  useEffect(() => {
    const savedToken = storage.getToken();
    const savedUser = storage.getUser();

    if (savedToken && savedUser) {
      setToken(savedToken);
      // Asegurar que el usuario siempre tenga un role
      const userWithRole = {
        ...savedUser,
        role: savedUser.role || 'user',
      };
      setUser(userWithRole);
    }

    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authService.login(email, password);

      storage.saveToken(response.token);
      const userData: User = {
        userId: response.userId,
        name: response.name,
        email: response.email,
        isVerified: response.isVerified,
        role: response.role || 'user',
      };
      storage.saveUser(userData);

      setToken(response.token);
      setUser(userData);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al iniciar sesión';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (email: string, password: string, name: string, faculty?: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authService.register(email, password, name, faculty);

      storage.saveToken(response.token);
      const userData: User = {
        userId: response.userId,
        email: response.email,
        name: response.name,
        isVerified: response.isVerified,
        role: response.role || 'user',
      };
      storage.saveUser(userData);

      setToken(response.token);
      setUser(userData);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al registrarse';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyEmailToken = useCallback(async (emailToken: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authService.verifyEmail(emailToken);

      // Solo actualizar el estado si el usuario está autenticado
      // Si verifica desde otra ventana sin autenticación, 
      // simplemente retornamos la respuesta para que el frontend lo maneje
      if (user && token) {
        const updatedUser: User = {
          ...user,
          isVerified: response.isVerified || true,
        };
        
        storage.saveUser(updatedUser);
        setUser(updatedUser);
      }

      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al verificar el email';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [user, token]);

  const logout = useCallback(() => {
    storage.clearAuth();
    setUser(null);
    setToken(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    error,
    login,
    register,
    verifyEmailToken,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
