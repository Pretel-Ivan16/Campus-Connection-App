import { XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface VerifyEmailErrorProps {
  message: string;
}

export default function VerifyEmailError({ message }: VerifyEmailErrorProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <XCircle className="w-16 h-16 text-red-500 mb-4" />
      <p className="text-center text-gray-600 mb-6">{message}</p>
      <button
        onClick={() => navigate('/login')}
        className="px-6 py-2 bg-[#6483ff] text-white rounded-lg hover:opacity-90 transition-opacity"
      >
        Ir al Login
      </button>
    </div>
  );
}
