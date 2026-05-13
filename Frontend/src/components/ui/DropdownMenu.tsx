import type { ReactNode } from "react";

interface DropdownMenuProps {
  isOpen: boolean;
  children: ReactNode;
  align?: 'left' | 'right';
  position?: 'top' | 'bottom';
}

export default function DropdownMenu({
  isOpen,
  children,
  align = 'right',
  position = 'bottom',
}: DropdownMenuProps) {
  if (!isOpen) return null;

  const alignClass = align === 'right' ? 'right-0' : 'left-0';
  const positionClass = position === 'bottom' ? 'top-full mt-2' : 'bottom-full mb-2';

  return (
    <div
      className={`absolute ${alignClass} ${positionClass} w-48 bg-[#1a1a1a] rounded-lg shadow-lg z-50 animate-in fade-in zoom-in-95 duration-200`}
    >
      {children}
    </div>
  );
}
