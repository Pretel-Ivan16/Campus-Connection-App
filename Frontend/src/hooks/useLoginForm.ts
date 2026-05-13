import { useState } from 'react';
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

  const handleSubmit = async (e: React.FormEvent) => {
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
      setTimeout(() => {
        navigate('/home');
      }, 100);
    } catch (err: any) {
      const errorMessage = getErrorMessage(err);
      setFormError(errorMessage);
    }
  };

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
