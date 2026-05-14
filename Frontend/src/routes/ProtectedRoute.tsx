import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireEmailVerification?: boolean;
}

export const ProtectedRoute = ({ children, requireEmailVerification = true }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si se requiere verificación de email y el usuario no lo ha verificado
  if (requireEmailVerification && user && !user.isVerified) {
    return <Navigate to="/verify-email-pending" replace />;
  }

  return <>{children}</>;
};
