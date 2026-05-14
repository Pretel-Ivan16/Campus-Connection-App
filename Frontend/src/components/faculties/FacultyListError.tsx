interface FacultyListErrorProps {
  error: string;
}

export const FacultyListError = ({ error }: FacultyListErrorProps) => {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center">
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    </div>
  );
};
