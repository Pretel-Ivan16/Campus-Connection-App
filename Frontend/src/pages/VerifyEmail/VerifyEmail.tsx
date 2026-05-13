import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Loader } from 'lucide-react';
import { authService } from '../../services/auth.service';
import FormHeader from '../../components/ui/FormHeader';

export default function VerifyEmail() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verificando tu email...');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (!token) {
          setStatus('error');
          setMessage('Token de verificación inválido o faltante');
          return;
        }

        await authService.verifyEmail(token);
        setStatus('success');
        setMessage('¡Tu email ha sido verificado exitosamente!');
        
        // Redirigir al login después de 3 segundos
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (error: any) {
        setStatus('error');
        const errorMessage = error?.response?.data?.message || 'Error al verificar el email';
        setMessage(errorMessage);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <FormHeader title="CampusConnect" subtitle="Verificación de Email" />

        <div className="flex flex-col items-center justify-center py-8">
          {status === 'loading' && (
            <>
              <Loader className="w-16 h-16 text-[#6483ff] animate-spin mb-4" />
              <p className="text-center text-gray-600">{message}</p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
              <p className="text-center text-gray-600 mb-4">{message}</p>
              <p className="text-center text-sm text-gray-500">
                Serás redirigido al login en unos segundos...
              </p>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className="w-16 h-16 text-red-500 mb-4" />
              <p className="text-center text-gray-600 mb-6">{message}</p>
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2 bg-[#6483ff] text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Ir al Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
