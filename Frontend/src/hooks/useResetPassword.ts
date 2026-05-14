import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';

export const useResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (token: string, e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validaciones
    if (!newPassword || !confirmPassword) {
      setError('Por favor completa todos los campos');
      return;
    }

    if (newPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setIsLoading(true);
    try {
      await authService.resetPassword(token, newPassword);
      // Success - show message and redirect to login after 2 seconds
      setSuccess('¡Contraseña actualizada correctamente!');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      // Show detailed error message
      const errorMsg = err.response?.data?.message || err.message || 'No pudimos resetear tu contraseña. Intenta más tarde.';
      setError(errorMsg);
      setIsLoading(false);
    }
  };

  return {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    success,
    isLoading,
    handleSubmit,
  };
};
