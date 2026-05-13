import { useState } from 'react';
import { useFaculties } from '../../hooks/useFaculties';
import { useFacultyActions } from '../../hooks/useFacultyActions';
import { CreateFacultyModal } from '../../components/faculties/CreateFacultyModal';
import { EditFacultyModal } from '../../components/faculties/EditFacultyModal';
import { FacultyListHeader } from '../../components/faculties/FacultyListHeader';
import { FacultyListContent } from '../../components/faculties/FacultyListContent';
import { FacultyListEmpty } from '../../components/faculties/FacultyListEmpty';
import { FacultyListLoading } from '../../components/faculties/FacultyListLoading';
import { FacultyListError } from '../../components/faculties/FacultyListError';

export const Faculties = () => {
  const { faculties, isLoading, error, refetch } = useFaculties();
  const {
    isDeleting,
    isCreating,
    isEditing,
    editingFaculty,
    handleDelete,
    handleEdit,
    handleEditFaculty,
    handleCreateFaculty,
    closeEditModal,
  } = useFacultyActions(refetch);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Estados de carga y error
  if (isLoading) {
    return <FacultyListLoading />;
  }

  if (error) {
    return <FacultyListError error={error} />;
  }

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FacultyListHeader
          count={faculties.length}
          onCreateClick={() => setIsCreateModalOpen(true)}
          isCreating={isCreating}
        />

        {/* Contenido */}
        {faculties.length === 0 ? (
          <FacultyListEmpty />
        ) : (
          <FacultyListContent
            faculties={faculties}
            isDeleting={isDeleting}
            onDelete={handleDelete}
            onEdit={(faculty) => {
              handleEdit(faculty);
              setIsEditModalOpen(true);
            }}
          />
        )}

        {/* Modal para crear facultad */}
        <CreateFacultyModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateFaculty}
          isLoading={isCreating}
        />

        {/* Modal para editar facultad */}
        <EditFacultyModal
          isOpen={isEditModalOpen}
          faculty={editingFaculty}
          onClose={() => {
            setIsEditModalOpen(false);
            closeEditModal();
          }}
          onSubmit={handleEditFaculty}
          isLoading={isEditing}
        />
      </div>
    </div>
  );
};

export default Faculties;
