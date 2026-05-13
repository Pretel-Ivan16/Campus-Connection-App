import { useLoginForm } from '../../hooks/useLoginForm';
import { useNavigate } from 'react-router-dom';
import FormHeader from '../../components/ui/FormHeader';
import ErrorAlert from '../../components/ui/ErrorAlert';
import TextInput from '../../components/ui/TextInput';
import SubmitButton from '../../components/ui/SubmitButton';
import AuthFooter from '../../components/ui/AuthFooter';

export default function Login() {
  const navigate = useNavigate();
  const { formError, email, setEmail, password, setPassword, handleSubmit, isLoading } = useLoginForm();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <FormHeader title="CampusConnect" subtitle="Inicia sesión en tu cuenta" />

        {formError && <ErrorAlert message={formError} />}

        <form onSubmit={handleSubmit} className="space-y-5">
          <TextInput
            id="email"
            label="Email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon="mail"
          />

          <TextInput
            id="password"
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon="lock"
          />

          <SubmitButton isLoading={isLoading} label="Iniciar Sesión" loadingLabel="Iniciando sesión..." />

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate('/recover-password')}
              className="text-sm text-gray-500 hover:text-[#6483ff] transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </form>

        <AuthFooter
          question="¿No tienes cuenta?"
          linkText="Regístrate aquí"
          onLinkClick={() => navigate('/register')}
        />
      </div>
    </div>
  );
}
