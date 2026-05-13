import { useState } from 'react';
import { facultyService, type Faculty, type CreateFacultyRequest, type UpdateFacultyRequest } from '../services/faculty.service';
import toast from 'react-hot-toast';

interface UseFacultyActionsReturn {
  isDeleting: string | null;
  isCreating: boolean;
  isEditing: boolean;
  editingFaculty: Faculty | null;
  handleDelete: (id: string) => Promise<void>;
  handleEdit: (faculty: Faculty) => void;
  handleEditFaculty: (data: UpdateFacultyRequest) => Promise<void>;
  handleCreateFaculty: (data: CreateFacultyRequest) => Promise<void>;
  closeEditModal: () => void;
}

/**
 * Hook personalizado para manejar las acciones CRUD de facultades
 */
export const useFacultyActions = (onRefetch: () => void): UseFacultyActionsReturn => {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta facultad?')) {
      return;
    }

    try {
      setIsDeleting(id);
      await facultyService.deleteFaculty(id);
      toast.success('Facultad eliminada exitosamente');
      onRefetch();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al eliminar facultad';
      toast.error(errorMessage);
    } finally {
      setIsDeleting(null);
    }
  };

  const handleEdit = (faculty: Faculty) => {
    setEditingFaculty(faculty);
  };

  const handleEditFaculty = async (data: UpdateFacultyRequest) => {
    if (!editingFaculty) return;

    try {
      setIsEditing(true);
      await facultyService.updateFaculty(editingFaculty._id, data);
      toast.success('Facultad actualizada exitosamente');
      setEditingFaculty(null);
      onRefetch();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al actualizar facultad';
      toast.error(errorMessage);
      console.error('Error updating faculty:', err);
    } finally {
      setIsEditing(false);
    }
  };

  const handleCreateFaculty = async (data: CreateFacultyRequest) => {
    try {
      setIsCreating(true);
      await facultyService.createFaculty(data);
      toast.success('Facultad creada exitosamente');
      onRefetch();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al crear facultad';
      toast.error(errorMessage);
      console.error('Error creating faculty:', err);
    } finally {
      setIsCreating(false);
    }
  };

  const closeEditModal = () => {
    setEditingFaculty(null);
  };

  return {
    isDeleting,
    isCreating,
    isEditing,
    editingFaculty,
    handleDelete,
    handleEdit,
    handleEditFaculty,
    handleCreateFaculty,
    closeEditModal,
  };
};
