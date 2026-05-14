import { useAuth } from './useAuth';

/**
 * useAdmin - Hook para verificar si el usuario es admin
 * 
 * Retorna true si el usuario actual tiene rol de admin
 * 
 * Uso:
 * const isAdmin = useAdmin();
 * if (isAdmin) {
 *   // Mostrar opciones de admin
 * }
 */
export const useAdmin = (): boolean => {
  const { user } = useAuth();
  return user?.role === 'admin' || false;
};
