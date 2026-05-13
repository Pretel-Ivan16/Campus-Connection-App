import { ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';

interface RoleGuardProps {
  allowedRoles?: ('admin' | 'user')[];
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * RoleGuard - Componente para mostrar/ocultar contenido según el rol del usuario
 * 
 * Uso:
 * <RoleGuard allowedRoles={['admin']}>
 *   <button>Crear Facultad</button>
 * </RoleGuard>
 */
export const RoleGuard = ({ 
  allowedRoles = ['admin'], 
  children, 
  fallback = null 
}: RoleGuardProps) => {
  const { user } = useAuth();
  const userRole = user?.role || 'user';

  // Si el rol del usuario está en los permitidos, mostrar el contenido
  if (allowedRoles.includes(userRole as 'admin' | 'user')) {
    return <>{children}</>;
  }

  // Si no, mostrar el fallback (por defecto nada)
  return <>{fallback}</>;
};
