import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function VerifyEmailPending() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-100 rounded-full blur-lg"></div>
            <div className="relative bg-blue-600 rounded-full p-4">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Email no verificado
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Hemos enviado un enlace de verificación a tu correo electrónico en{' '}
          <span className="font-semibold text-gray-900">{user?.email}</span>
        </p>

        {/* Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 flex gap-3">
          <svg className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          <div>
            <p className="text-sm text-yellow-800">
              <span className="font-semibold">Acción requerida:</span> Debes verificar tu email para acceder a todas las funcionalidades de la plataforma.
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-lg p-4 mb-8">
          <h2 className="font-semibold text-gray-900 mb-3">¿Qué hacer ahora?</h2>
          <ol className="space-y-2 text-sm text-gray-700">
            <li>1. Revisa tu bandeja de entrada de correo electrónico</li>
            <li>2. Busca un email de Campus Connection</li>
            <li>3. Haz clic en el enlace para verificar tu email</li>
            <li>4. Serás redirigido automáticamente a tu cuenta</li>
          </ol>
        </div>

        {/* Tip */}
        <div className="bg-gray-50 rounded-lg p-4 mb-8">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">Consejo:</span> Si no encuentras el email, revisa tu carpeta de spam o correo no deseado.
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleLogout}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Cerrar sesión
          </button>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 rounded-lg transition-colors"
          >
            Recargar página
          </button>
        </div>

        {/* Help text */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Si tienes problemas, contacta a{' '}
          <a href="mailto:soporte@campusconnection.com" className="text-blue-600 hover:underline">
            soporte@campusconnection.com
          </a>
        </p>
      </div>
    </div>
  );
}
