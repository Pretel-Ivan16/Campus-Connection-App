interface UserButtonProps {
  name: string;
  onClick: () => void;
  isActive?: boolean;
}

export default function UserButton({ name, onClick, isActive }: UserButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm lg:text-base ${
        isActive
          ? 'bg-[#1a1a1a] text-[#6483ff]'
          : 'text-[#b0b0b0] hover:text-[#6483ff] hover:bg-[#1a1a1a]'
      }`}
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
      <span>{name || 'Usuario'}</span>
    </button>
  );
}
