import type { ReactNode } from "react";


interface DropdownItemProps {
  children: ReactNode;
  onClick?: () => void;
  isSeparator?: boolean;
}

export default function DropdownItem({ children, onClick, isSeparator }: DropdownItemProps) {
  if (isSeparator) {
    return <div className="border-b border-[#2a2a2a]" />;
  }

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2 px-4 py-3 text-[#b0b0b0] hover:text-[#6483ff] hover:bg-[#1a1a1a] transition-colors text-sm"
    >
      {children}
    </button>
  );
}
