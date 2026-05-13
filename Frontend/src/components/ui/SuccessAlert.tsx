interface SuccessAlertProps {
  message: string;
}

export default function SuccessAlert({ message }: SuccessAlertProps) {
  return (
    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
      <svg 
        className="h-5 w-5 text-green-600 shrink-0 mt-0.5" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      <div>
        <p className="text-green-700 text-sm font-medium">{message}</p>
        <p className="text-green-600 text-xs mt-1">Serás redirigido al login en unos segundos...</p>
      </div>
    </div>
  );
}
