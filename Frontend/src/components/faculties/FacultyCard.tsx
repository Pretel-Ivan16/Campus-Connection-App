import { Link } from 'react-router-dom';
import type { Faculty } from '../../services/faculty.service';
import { RoleGuard } from '../RoleGuard';
import { Trash2, Edit2 } from 'lucide-react';

interface FacultyCardProps {
  faculty: Faculty;
  onDelete?: (id: string) => void;
  onEdit?: (faculty: Faculty) => void;
  isDeleting?: boolean;
}

export const FacultyCard = ({ faculty, onDelete, onEdit, isDeleting }: FacultyCardProps) => {
  return (
    <Link to={`/facultades/${faculty._id}`} className="group">
      <div className="bg-linear-to-br from-[#1a1d2e] to-[#0d0f16] border border-[#2a2a2a] rounded-lg p-6 hover:border-[#6483ff] hover:shadow-lg hover:shadow-[#6483ff]/20 transition-all duration-300 h-full flex flex-col">
        {/* Header con acciones */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white group-hover:text-[#6483ff] transition-colors truncate">
              {faculty.name}
            </h3>
          </div>

          {/* Botones de admin (no clickean el link) */}
          <RoleGuard allowedRoles={['admin']}>
            <div className="flex gap-2 shrink-0" onClick={(e) => e.preventDefault()}>
              <button
                onClick={() => onEdit?.(faculty)}
                className="p-2 rounded-lg bg-[#2a2a2a] hover:bg-blue-600 text-[#b0b0b0] hover:text-white transition-colors"
                title="Editar facultad"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => onDelete?.(faculty._id)}
                disabled={isDeleting}
                className="p-2 rounded-lg bg-[#2a2a2a] hover:bg-red-600 text-[#b0b0b0] hover:text-white transition-colors disabled:opacity-50"
                title="Eliminar facultad"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </RoleGuard>
        </div>

        {/* Descripción */}
        {faculty.description && (
          <p className="text-[#8f8f8f] text-sm mb-4 flex-1 line-clamp-3">
            {faculty.description}
          </p>
        )}

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-[#2a2a2a] text-xs text-[#8f8f8f]">
          {faculty.createdAt && (
            <p>
              Creada: {new Date(faculty.createdAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
