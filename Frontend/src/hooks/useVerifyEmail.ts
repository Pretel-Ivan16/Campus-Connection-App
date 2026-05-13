import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

type VerificationStatus = 'loading' | 'success' | 'error';

interface UseVerifyEmailReturn {
  status: VerificationStatus;
  message: string;
}

export const useVerifyEmail = (token: string | undefined): UseVerifyEmailReturn => {
  const navigate = useNavigate();
  const { verifyEmailToken, isAuthenticated } = useAuth();
  const [status, setStatus] = useState<VerificationStatus>('loading');
  const [message, setMessage] = useState('Verificando tu email...');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (!token) {
          setStatus('error');
          setMessage('Token de verificación inválido o faltante');
          return;
        }

        await verifyEmailToken(token);
        setStatus('success');
        setMessage('¡Tu email ha sido verificado exitosamente!');

        // Redirigir según si está autenticado o no
        setTimeout(() => {
          // Si está autenticado, va a home
          // Si no está autenticado, va a login para que inicie sesión
          const destination = isAuthenticated ? '/home' : '/login';
          navigate(destination);
        }, 3000);
      } catch (error: any) {
        setStatus('error');
        const errorMessage = error?.response?.data?.message || 'Error al verificar el email';
        setMessage(errorMessage);
      }
    };

    verifyEmail();
  }, [token, navigate, verifyEmailToken, isAuthenticated]);

  return {
    status,
    message,
  };
};
