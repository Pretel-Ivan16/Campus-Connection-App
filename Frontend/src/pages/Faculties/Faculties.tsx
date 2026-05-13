import { useState } from 'react';
import { useFaculties } from '../../hooks/useFaculties';
import { facultyService, type Faculty, type CreateFacultyRequest } from '../../services/faculty.service';
import { FacultyCard } from '../../components/faculties/FacultyCard';
import { CreateFacultyModal } from '../../components/faculties/CreateFacultyModal';
import { RoleGuard } from '../../components/RoleGuard';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export const Faculties = () => {
  const { faculties, isLoading, error, refetch } = useFaculties();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta facultad?')) {
      return;
    }

    try {
      setIsDeleting(id);
      await facultyService.deleteFaculty(id);
      toast.success('Facultad eliminada exitosamente');
      refetch();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al eliminar facultad';
      toast.error(errorMessage);
    } finally {
      setIsDeleting(null);
    }
  };

  const handleEdit = (faculty: Faculty) => {
    console.log('Edit faculty:', faculty);
    // TODO: Abrir modal o navegar a página de edición
  };

  const handleCreateFaculty = async (data: CreateFacultyRequest) => {
    try {
      setIsCreating(true);
      await facultyService.createFaculty(data);
      toast.success('Facultad creada exitosamente');
      refetch();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al crear facultad';
      toast.error(errorMessage);
      console.error('Error creating faculty:', err);
    } finally {
      setIsCreating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-[#8f8f8f]">Cargando facultades...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Facultades</h1>
            <p className="text-[#8f8f8f]">
              Explora las {faculties.length} facultad{faculties.length !== 1 ? 'es' : ''} disponibles
            </p>
          </div>

          {/* Botón crear facultad (solo admins) */}
          <RoleGuard allowedRoles={['admin']}>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 bg-[#6483ff] hover:bg-[#5474e0] text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
              disabled={isCreating}
            >
              <Plus size={20} />
              Nueva Facultad
            </button>
          </RoleGuard>
        </div>

        {/* Grid de facultades */}
        {faculties.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#8f8f8f] text-lg mb-4">No hay facultades disponibles</p>
            <RoleGuard allowedRoles={['admin']}>
              <p className="text-[#8f8f8f] text-sm">
                Como administrador, puedes crear la primera facultad usando el botón arriba.
              </p>
            </RoleGuard>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faculties.map((faculty) => (
              <FacultyCard
                key={faculty._id}
                faculty={faculty}
                onDelete={handleDelete}
                onEdit={handleEdit}
                isDeleting={isDeleting === faculty._id}
              />
            ))}
          </div>
        )}

        {/* Modal para crear facultad */}
        <CreateFacultyModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateFaculty}
          isLoading={isCreating}
        />
      </div>
    </div>
  );
};

export default Faculties;
