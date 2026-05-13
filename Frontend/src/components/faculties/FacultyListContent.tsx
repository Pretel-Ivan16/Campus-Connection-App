import type { Faculty } from '../../services/faculty.service';
import { FacultyCard } from './FacultyCard';

interface FacultyListContentProps {
  faculties: Faculty[];
  isDeleting: string | null;
  onDelete: (id: string) => void;
  onEdit: (faculty: Faculty) => void;
}

export const FacultyListContent = ({ faculties, isDeleting, onDelete, onEdit }: FacultyListContentProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {faculties.map((faculty) => (
        <FacultyCard
          key={faculty._id}
          faculty={faculty}
          onDelete={onDelete}
          onEdit={onEdit}
          isDeleting={isDeleting === faculty._id}
        />
      ))}
    </div>
  );
};
