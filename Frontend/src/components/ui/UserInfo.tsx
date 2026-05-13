interface UserInfoProps {
  email: string;
}

export default function UserInfo({ email }: UserInfoProps) {
  return (
    <div className="p-4 border-b border-[#2a2a2a]">
      <p className="text-sm text-[#b0b0b0]">
        <span className="font-semibold">Email:</span> {email}
      </p>
    </div>
  );
}
