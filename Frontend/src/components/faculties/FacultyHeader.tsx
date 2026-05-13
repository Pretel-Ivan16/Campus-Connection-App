import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const FacultyHeader = () => {
  return (
    <Link to="/facultades" className="flex items-center gap-2 text-[#6483ff] hover:text-[#5474e0] mb-8 transition-colors">
      <ArrowLeft size={20} />
      Volver a Facultades
    </Link>
  );
};
