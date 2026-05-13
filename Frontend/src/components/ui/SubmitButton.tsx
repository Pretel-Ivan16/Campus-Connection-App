import { Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  isLoading: boolean;
  label: string;
  loadingLabel?: string;
}

export default function SubmitButton({ isLoading, label, loadingLabel = `${label}...` }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          {loadingLabel}
        </>
      ) : (
        label
      )}
    </button>
  );
}
