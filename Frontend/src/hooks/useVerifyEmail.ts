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
  const { verifyEmailToken, logout } = useAuth();
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
      } catch (error: any) {
        setStatus('error');
        const errorMessage = error?.response?.data?.message || 'Error al verificar el email';
        setMessage(errorMessage);
      }
    };

    verifyEmail();
  }, [token, verifyEmailToken]);

  // Efecto separado para manejar la redirección después de verificación exitosa
  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => {
        logout();
        navigate('/login');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status, logout, navigate]);

  return {
    status,
    message,
  };
};
