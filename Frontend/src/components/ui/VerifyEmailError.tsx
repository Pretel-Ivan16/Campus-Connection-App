import { useNavigate } from 'react-router-dom';

interface VerifyEmailErrorProps {
  message: string;
}

export default function VerifyEmailError({ message }: VerifyEmailErrorProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <svg className="w-16 h-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
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
