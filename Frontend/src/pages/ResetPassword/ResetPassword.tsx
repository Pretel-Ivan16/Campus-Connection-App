import { useParams, useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft } from 'lucide-react';
import { useResetPassword } from '../../hooks/useResetPassword';
import FormHeader from '../../components/ui/FormHeader';
import ErrorAlert from '../../components/ui/ErrorAlert';
import TextInput from '../../components/ui/TextInput';
import SubmitButton from '../../components/ui/SubmitButton';

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    isLoading,
    handleSubmit,
  } = useResetPassword();

  if (!token) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Enlace inválido</h2>
            <p className="text-gray-600 mb-6">El enlace de recuperación no es válido o ha expirado.</p>
            <button
              onClick={() => navigate('/recover-password')}
              className="text-[#6483ff] hover:opacity-80 transition-opacity"
            >
              Solicitar otro enlace
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 text-[#6483ff] hover:opacity-80 transition-opacity mb-6"
        >
          <ArrowLeft size={18} />
          <span className="text-sm">Volver al login</span>
        </button>

        <FormHeader 
          title="Nueva Contraseña" 
          subtitle="Establece una nueva contraseña para tu cuenta" 
        />

        {error && <ErrorAlert message={error} />}

        <form onSubmit={(e) => handleSubmit(token, e)} className="space-y-5">
          <TextInput
            id="newPassword"
            label="Nueva Contraseña"
            type="password"
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            icon={Lock}
          />

          <TextInput
            id="confirmPassword"
            label="Confirmar Contraseña"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            icon={Lock}
          />

          <SubmitButton 
            isLoading={isLoading} 
            label="Resetear Contraseña" 
            loadingLabel="Resetando..." 
          />
        </form>
      </div>
    </div>
  );
}
