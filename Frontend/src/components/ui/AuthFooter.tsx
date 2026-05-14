interface AuthFooterProps {
  question: string;
  linkText: string;
  onLinkClick: () => void;
}

export default function AuthFooter({ question, linkText, onLinkClick }: AuthFooterProps) {
  return (
    <div className="mt-6 text-center">
      <p className="text-gray-600 text-sm">
        {question}{' '}
        <button onClick={onLinkClick} className="text-blue-600 hover:underline font-medium">
          {linkText}
        </button>
      </p>
    </div>
  );
}
