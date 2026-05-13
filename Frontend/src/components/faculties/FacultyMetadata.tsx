import type { Faculty } from '../../services/faculty.service';

interface FacultyMetadataProps {
  faculty: Faculty;
}

export const FacultyMetadata = ({ faculty }: FacultyMetadataProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <p className="text-[#8f8f8f] text-sm">Fecha de creación</p>
        <p className="text-white font-semibold">{formatDate(faculty.createdAt)}</p>
      </div>
      <div>
        <p className="text-[#8f8f8f] text-sm">Última actualización</p>
        <p className="text-white font-semibold">{formatDate(faculty.updatedAt)}</p>
      </div>
    </div>
  );
};
