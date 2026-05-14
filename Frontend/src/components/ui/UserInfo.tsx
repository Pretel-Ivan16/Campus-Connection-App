interface UserInfoProps {
  name: string;
  email: string;
}

export default function UserInfo({ name, email }: UserInfoProps) {
  return (
    <div className="p-4 border-b border-[#2a2a2a]">
      <p className="text-sm text-[#b0b0b0] mb-1">
        <span className="font-semibold">Usuario:</span> {name}
      </p>
      <p className="text-sm text-[#b0b0b0]">
        <span className="font-semibold">Email:</span> {email}
      </p>
    </div>
  );
}
