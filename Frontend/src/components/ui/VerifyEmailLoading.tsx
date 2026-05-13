import { Loader } from 'lucide-react';

interface VerifyEmailLoadingProps {
  message: string;
}

export default function VerifyEmailLoading({ message }: VerifyEmailLoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Loader className="w-16 h-16 text-[#6483ff] animate-spin mb-4" />
      <p className="text-center text-gray-600">{message}</p>
    </div>
  );
}
