import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

interface PasswordValidation {
  minLength: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasSpecialChar: boolean;
  hasNumber: boolean;
  isValid: boolean;
}

const validatePassword = (password: string): PasswordValidation => {
  const minLength = password.length >= 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasSpecialChar = /[!.\'?$]/.test(password);
  const hasNumber = /\d/.test(password);
  const isValid = minLength && hasUpperCase && hasLowerCase && hasSpecialChar && hasNumber;

  return {
    minLength,
    hasUpperCase,
    hasLowerCase,
    hasSpecialChar,
    hasNumber,
    isValid,
  };
};

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const { register: registerUser, isLoading } = useAuth();

  const [formError, setFormError] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValidation, setPasswordValidation] = useState<PasswordValidation>({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasSpecialChar: false,
    hasNumber: false,
    isValid: false,
  });

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordValidation(validatePassword(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validación de campos vacíos
    if (!username || !email || !password || !confirmPassword) {
      setFormError('Por favor completa todos los campos');
      return;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError('Por favor ingresa un email válido');
      return;
    }

    // Validación de contraseña
    if (!passwordValidation.isValid) {
      setFormError(
        'La contraseña debe tener mínimo 6 caracteres, una mayúscula, una minúscula, un carácter especial (! . \' ? $) y un número'
      );
      return;
    }

    // Validación de coincidencia de contraseñas
    if (password !== confirmPassword) {
      setFormError('Las contraseñas no coinciden');
      return;
    }

    try {
      await registerUser(email, password, username);
      navigate('/verify-email-pending');
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err?.message || 'Error al registrarse. Intenta de nuevo.';
      setFormError(errorMessage);
    }
  };

  return {
    formError,
    username,
    setUsername,
    email,
    setEmail,
    password,
    handlePasswordChange,
    confirmPassword,
    setConfirmPassword,
    passwordValidation,
    handleSubmit,
    isLoading,
  };
};
