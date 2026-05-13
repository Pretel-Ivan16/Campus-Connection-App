import { useRegisterForm } from '../../hooks/useRegisterForm';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Check, X } from 'lucide-react';
import FormHeader from '../../components/ui/FormHeader';
import ErrorAlert from '../../components/ui/ErrorAlert';
import TextInput from '../../components/ui/TextInput';
import SubmitButton from '../../components/ui/SubmitButton';
import AuthFooter from '../../components/ui/AuthFooter';

const PasswordRequirement = ({ met, label }: { met: boolean; label: string }) => (
  <div className="flex items-center gap-2 text-sm">
    {met ? (
      <Check className="w-4 h-4 text-green-500" />
    ) : (
      <X className="w-4 h-4 text-gray-300" />
    )}
    <span className={met ? 'text-green-600' : 'text-gray-500'}>{label}</span>
  </div>
);

export default function Register() {
  const navigate = useNavigate();
  const {
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
  } = useRegisterForm();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <FormHeader title="CampusConnect" subtitle="Crea tu cuenta" />

        {formError && <ErrorAlert message={formError} />}

        <form onSubmit={handleSubmit} className="space-y-5">
          <TextInput
            id="username"
            label="Usuario"
            type="text"
            placeholder="tu_usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            icon={User}
          />

          <TextInput
            id="email"
            label="Email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
          />

          <div>
            <TextInput
              id="password"
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              icon={Lock}
            />

            {password && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg space-y-2">
                <p className="text-xs font-semibold text-gray-700 mb-2">Requisitos de contraseña:</p>
                <PasswordRequirement met={passwordValidation.minLength} label="Mínimo 6 caracteres" />
                <PasswordRequirement met={passwordValidation.hasUpperCase} label="Una mayúscula" />
                <PasswordRequirement met={passwordValidation.hasLowerCase} label="Una minúscula" />
                <PasswordRequirement met={passwordValidation.hasNumber} label="Un número" />
                <PasswordRequirement
                  met={passwordValidation.hasSpecialChar}
                  label="Un carácter especial (! . ' ? $)"
                />
              </div>
            )}
          </div>

          <TextInput
            id="confirmPassword"
            label="Confirmar Contraseña"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            icon={Lock}
          />

          {password && confirmPassword && password !== confirmPassword && (
            <div className="text-sm text-red-600 flex items-center gap-2">
              <X className="w-4 h-4" />
              Las contraseñas no coinciden
            </div>
          )}

          {password && confirmPassword && password === confirmPassword && (
            <div className="text-sm text-green-600 flex items-center gap-2">
              <Check className="w-4 h-4" />
              Las contraseñas coinciden
            </div>
          )}

          <SubmitButton isLoading={isLoading} label="Registrarse" loadingLabel="Registrando..." />
        </form>

        <AuthFooter
          question="¿Ya tienes cuenta?"
          linkText="Inicia sesión aquí"
          onLinkClick={() => navigate('/login')}
        />
      </div>
    </div>
  );
}
