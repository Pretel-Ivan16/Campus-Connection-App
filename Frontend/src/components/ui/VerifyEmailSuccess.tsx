import { CheckCircle } from 'lucide-react';

interface VerifyEmailSuccessProps {
  message: string;
}

export default function VerifyEmailSuccess({ message }: VerifyEmailSuccessProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
      <p className="text-center text-gray-600 mb-4">{message}</p>
      <p className="text-center text-sm text-gray-500">
        Serás redirigido al login en unos segundos...
      </p>
    </div>
  );
}
