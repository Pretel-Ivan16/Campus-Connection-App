import type { LucideIcon } from "lucide-react";


interface TextInputProps {
  id: string;
  label: string;
  type: 'email' | 'password' | 'text';
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: LucideIcon;
  required?: boolean;
}

export default function TextInput({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  icon: Icon,
  required = true,
}: TextInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
        />
      </div>
    </div>
  );
}
