import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface FacultyErrorStateProps {
  error?: string | null;
}

export const FacultyErrorState = ({ error }: FacultyErrorStateProps) => {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/facultades" className="flex items-center gap-2 text-[#6483ff] hover:text-[#5474e0] mb-6 transition-colors">
          <ArrowLeft size={20} />
          Volver a Facultades
        </Link>
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
          <p className="text-red-400">{error || 'Facultad no encontrada'}</p>
        </div>
      </div>
    </div>
  );
};
