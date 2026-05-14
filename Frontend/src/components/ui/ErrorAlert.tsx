interface ErrorAlertProps {
  message: string;
}

export default function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
      <svg 
        className="h-5 w-5 text-red-600 shrink-0 mt-0.5" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 9v2m0 4v2m0 0v2m6-6V9a2 2 0 00-2-2H8a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2z" 
        />
      </svg>
      <p className="text-red-700 text-sm">{message}</p>
    </div>
  );
}
