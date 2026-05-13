import { RoleGuard } from '../../components/RoleGuard';
import { Plus } from 'lucide-react';

interface FacultyListHeaderProps {
  count: number;
  onCreateClick: () => void;
  isCreating?: boolean;
}

export const FacultyListHeader = ({ count, onCreateClick, isCreating }: FacultyListHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-12">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Facultades</h1>
        <p className="text-[#8f8f8f]">
          Explora las {count} facultad{count !== 1 ? 'es' : ''} disponibles
        </p>
      </div>

      <RoleGuard allowedRoles={['admin']}>
        <button
          onClick={onCreateClick}
          className="flex items-center gap-2 bg-[#6483ff] hover:bg-[#5474e0] text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
          disabled={isCreating}
        >
          <Plus size={20} />
          Nueva Facultad
        </button>
      </RoleGuard>
    </div>
  );
};
