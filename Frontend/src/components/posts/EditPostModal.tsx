import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { postService } from '../../services/post.service';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Post } from '../../types/posts.types';

const editPostSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  content: z.string().min(10, 'El contenido debe tener al menos 10 caracteres'),
});

type EditPostFormData = z.infer<typeof editPostSchema>;

interface EditPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post | null;
  onPostUpdated: () => void;
}

export const EditPostModal = ({
  isOpen,
  onClose,
  post,
  onPostUpdated,
}: EditPostModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditPostFormData>({
    resolver: zodResolver(editPostSchema),
    values: {
      title: post?.title || '',
      content: post?.content || '',
    },
  });

  const onSubmit = async (data: EditPostFormData) => {
    if (!post) return;

    try {
      setIsSubmitting(true);
      await postService.updatePost(post._id, {
        title: data.title,
        content: data.content,
      });
      toast.success('Publicación actualizada correctamente');
      onPostUpdated();
      onClose();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al actualizar la publicación';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" style={{ backgroundColor: '#0d0f16', borderColor: '#252933' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: '#252933' }}>
          <h2 className="text-2xl font-bold text-white">Editar Publicación</h2>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1 hover:opacity-70 rounded transition-colors disabled:opacity-50"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4" translate="no">
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
              className={`w-full px-4 py-2 border rounded-lg text-white placeholder-[#8f8f8f] focus:outline-none focus:border-[#6483ff] transition-colors ${
                errors.title ? 'border-[#d40924]' : 'border-[#252933]'
              }`}
              style={{
                backgroundColor: '#171a24',
              }}
              disabled={isSubmitting}
            />
            {errors.title && (
              <p className="mt-1 text-sm" style={{ color: '#d40924' }}>{errors.title.message}</p>
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
              className={`w-full px-4 py-2 border rounded-lg text-white placeholder-[#8f8f8f] focus:outline-none focus:border-[#6483ff] transition-colors resize-none ${
                errors.content ? 'border-[#d40924]' : 'border-[#252933]'
              }`}
              style={{
                backgroundColor: '#171a24',
              }}
              disabled={isSubmitting}
            />
            {errors.content && (
              <p className="mt-1 text-sm" style={{ color: '#d40924' }}>{errors.content.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t" style={{ borderColor: '#252933' }}>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 text-white rounded-lg hover:opacity-80 transition-colors disabled:opacity-50 border"
              style={{
                borderColor: '#252933',
                backgroundColor: 'transparent'
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 text-white rounded-lg transition-colors disabled:opacity-50 font-medium hover:opacity-90"
              style={{ backgroundColor: '#6483ff' }}
            >
              {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
