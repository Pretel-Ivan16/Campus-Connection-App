import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import type { CreateFacultyRequest } from '../../services/faculty.service';


// Esquema de validación
const createFacultySchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  description: z.string().optional(),
});

type CreateFacultyForm = z.infer<typeof createFacultySchema>;

interface CreateFacultyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateFacultyRequest) => Promise<void>;
  isLoading?: boolean;
}

export const CreateFacultyModal = ({ isOpen, onClose, onSubmit, isLoading }: CreateFacultyModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateFacultyForm>({
    resolver: zodResolver(createFacultySchema),
  });

  const handleFormSubmit = async (data: CreateFacultyForm) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
      reset();
      onClose();
    } catch (error: any) {
      console.error('Error in form submission:', error);
      // El error ya se maneja en el componente padre (toast)
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1d2e] border border-[#2a2a2a] rounded-lg p-8 max-w-md w-full shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Nueva Facultad</h2>
          <button
            onClick={onClose}
            disabled={isSubmitting || isLoading}
            className="text-[#8f8f8f] hover:text-white transition-colors disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4" translate="no">
          {/* Nombre */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
              Nombre de la Facultad *
            </label>
            <input
              {...register('name')}
              type="text"
              placeholder="Ej: Facultad de Ingeniería"
              className="w-full px-4 py-2 bg-[#0d0f16] border border-[#2a2a2a] rounded-lg text-white placeholder-[#8f8f8f] focus:outline-none focus:border-[#6483ff] transition-colors"
              disabled={isSubmitting || isLoading}
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-white mb-2">
              Descripción
            </label>
            <textarea
              {...register('description')}
              placeholder="Describe brevemente la facultad"
              rows={4}
              className="w-full px-4 py-2 bg-[#0d0f16] border border-[#2a2a2a] rounded-lg text-white placeholder-[#8f8f8f] focus:outline-none focus:border-[#6483ff] transition-colors resize-none"
              disabled={isSubmitting || isLoading}
            />
            {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>}
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting || isLoading}
              className="flex-1 px-4 py-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="flex-1 px-4 py-2 bg-[#6483ff] hover:bg-[#5474e0] text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting || isLoading ? 'Creando...' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
