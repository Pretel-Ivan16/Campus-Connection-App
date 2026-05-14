import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { useLoginErrors } from './useLoginErrors';

export const useLoginForm = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const { getErrorMessage } = useLoginErrors();
  
  const [formError, setFormError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validación básica
    if (!email || !password) {
      setFormError('Por favor completa todos los campos');
      return;
    }

    try {
      await login(email, password);
      // Solo navega si el login es exitoso
      navigate('/home', { replace: true });
    } catch (err: any) {
      // Manejar 403 (email no verificado) especialmente
      if (err.response?.status === 403) {
        setFormError('Por favor verifica tu email. Hemos enviado un enlace a tu correo.');
        // No hacer nada más - el usuario debe verificar su email
        return;
      }

      const errorMessage = getErrorMessage(err);
      setFormError(errorMessage);
    }
  }, [email, password, login, navigate]);

  return {
    formError,
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    isLoading,
  };
};
