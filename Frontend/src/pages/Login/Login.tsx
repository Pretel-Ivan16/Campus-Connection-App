import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Mail, Lock } from 'lucide-react';
import FormHeader from '../../components/ui/FormHeader';
import ErrorAlert from '../../components/ui/ErrorAlert';
import TextInput from '../../components/ui/TextInput';
import SubmitButton from '../../components/ui/SubmitButton';
import AuthFooter from '../../components/ui/AuthFooter';

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading, error: authError } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setFormError(null);
      await login(email, password);
      navigate('/home');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message;
      if (errorMessage?.includes('Invalid email or password')) {
        setFormError('Email no encontrado o contraseña incorrecta. ¿No tienes cuenta? Regístrate aquí');
      } else {
        setFormError(errorMessage || 'Error al iniciar sesión');
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <FormHeader title="CampusConnect" subtitle="Inicia sesión en tu cuenta" />

        {(authError || formError) && <ErrorAlert message={authError || formError || ''} />}

        <form onSubmit={handleSubmit} className="space-y-5">
          <TextInput
            id="email"
            label="Email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
          />

          <TextInput
            id="password"
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={Lock}
          />

          <SubmitButton isLoading={isLoading} label="Iniciar Sesión" loadingLabel="Iniciando sesión..." />
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
