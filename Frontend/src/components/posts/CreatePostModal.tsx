import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { postService } from '../../services/post.service';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

const createPostSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  content: z.string().min(10, 'El contenido debe tener al menos 10 caracteres'),
});

type CreatePostFormData = z.infer<typeof createPostSchema>;

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  facultyId: string;
  onPostCreated: () => void;
}

export const CreatePostModal = ({
  isOpen,
  onClose,
  facultyId,
  onPostCreated,
}: CreatePostModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
  });

  const onSubmit = async (data: CreatePostFormData) => {
    try {
      setIsSubmitting(true);
      await postService.createPost({
        title: data.title,
        content: data.content,
        facultyId,
      });
      toast.success('Publicación creada correctamente');
      reset();
      onPostCreated();
      onClose();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al crear la publicación';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1d2e] border border-[#2a2a2a] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2a2a2a]">
          <h2 className="text-2xl font-bold text-white">Nueva Publicación</h2>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1 hover:bg-[#2a2a2a] rounded transition-colors disabled:opacity-50"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
              Título
            </label>
            <input
              {...register('title')}
              type="text"
              id="title"
              placeholder="Ingresa el título de la publicación"
              className={`w-full px-4 py-2 bg-[#0d0f16] border rounded-lg text-white placeholder-[#6f6f6f] focus:outline-none focus:border-blue-500 transition-colors ${
                errors.title ? 'border-red-500' : 'border-[#2a2a2a]'
              }`}
              disabled={isSubmitting}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-white mb-2">
              Contenido
            </label>
            <textarea
              {...register('content')}
              id="content"
              placeholder="Escribe el contenido de la publicación..."
              rows={6}
              className={`w-full px-4 py-2 bg-[#0d0f16] border rounded-lg text-white placeholder-[#6f6f6f] focus:outline-none focus:border-blue-500 transition-colors resize-none ${
                errors.content ? 'border-red-500' : 'border-[#2a2a2a]'
              }`}
              disabled={isSubmitting}
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-[#2a2a2a]">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 border border-[#2a2a2a] text-white rounded-lg hover:bg-[#2a2a2a] transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 font-medium"
            >
              {isSubmitting ? 'Creando...' : 'Crear Publicación'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
