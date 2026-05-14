interface VerifyEmailSuccessProps {
  message: string;
}

export default function VerifyEmailSuccess({ message }: VerifyEmailSuccessProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <svg className="w-16 h-16 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p className="text-center text-gray-600 mb-4">{message}</p>
      <p className="text-center text-sm text-gray-500">
        Serás redirigido al login en unos segundos...
      </p>
    </div>
  );
}
