import { User } from 'lucide-react';

interface UserButtonProps {
  email: string;
  onClick: () => void;
  isActive?: boolean;
}

export default function UserButton({ email, onClick, isActive }: UserButtonProps) {
  const username = email?.split('@')[0] || 'Usuario';

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm lg:text-base ${
        isActive
          ? 'bg-[#1a1a1a] text-[#6483ff]'
          : 'text-[#b0b0b0] hover:text-[#6483ff] hover:bg-[#1a1a1a]'
      }`}
    >
      <User size={20} />
      <span>{username}</span>
    </button>
  );
}
