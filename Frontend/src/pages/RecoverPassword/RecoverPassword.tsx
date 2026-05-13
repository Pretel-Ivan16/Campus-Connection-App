import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { authService } from '../../services/auth.service';
import FormHeader from '../../components/ui/FormHeader';
import ErrorAlert from '../../components/ui/ErrorAlert';
import TextInput from '../../components/ui/TextInput';
import SubmitButton from '../../components/ui/SubmitButton';

export default function RecoverPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!email) {
      setError('Por favor ingresa tu email');
      return;
    }

    setIsLoading(true);
    try {
      await authService.recoverPassword(email);
      setMessage('Se ha enviado un enlace de recuperación a tu email. Por favor revisa tu bandeja de entrada.');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'No pudimos procesar tu solicitud. Intenta más tarde.';
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

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
          title="Recuperar Contraseña" 
          subtitle="Ingresa tu email para recibir un enlace de recuperación" 
        />

        {error && <ErrorAlert message={error} />}
        
        {message && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700">{message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <TextInput
            id="recovery-email"
            label="Email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
          />

          <SubmitButton 
            isLoading={isLoading} 
            label="Enviar Enlace de Recuperación" 
            loadingLabel="Enviando..." 
          />
        </form>
      </div>
    </div>
  );
}
