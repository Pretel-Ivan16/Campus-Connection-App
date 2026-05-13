export const useLoginErrors = () => {
  const getErrorMessage = (err: any): string => {
    let errorMessage = 'Error al iniciar sesión';

    // Obtener el mensaje de error del backend
    if (err.response?.data?.message) {
      errorMessage = err.response.data.message;
    } else if (err.message) {
      errorMessage = err.message;
    }

    // Retornar mensajes personalizados según el tipo de error
    if (errorMessage?.includes('Invalid email or password')) {
      return 'Email o contraseña incorrecta. Verifica tus datos e intenta nuevamente.';
    } else if (errorMessage?.includes('verify your email')) {
      return 'Por favor verifica tu email antes de iniciar sesión. Revisa tu correo y haz click en el enlace de verificación.';
    }

    return errorMessage;
  };

  return { getErrorMessage };
};
