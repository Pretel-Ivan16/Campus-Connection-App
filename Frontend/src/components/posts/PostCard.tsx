import { MessageSquare, Calendar, User, Trash2, Edit2 } from 'lucide-react';
import type { Post } from '../../types/posts.types';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { useAuth } from '../../hooks/useAuth';

interface PostCardProps {
  post: Post;
  isAdmin?: boolean;
  isAuthenticated?: boolean;
  onEdit?: (post: Post) => void;
  onDelete?: (postId: string) => void;
}

export const PostCard = ({
  post,
  isAdmin = false,
  isAuthenticated = false,
  onEdit,
  onDelete,
}: PostCardProps) => {
  const { user } = useAuth();
  const createdAt = new Date(post.createdAt);
  const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true, locale: es });
  
  // Permitir editar/eliminar si es admin o si es el autor del post
  const isAuthor = user?.userId === post.authorId;
  const canEdit = isAdmin || isAuthor;
  const canDelete = isAdmin || isAuthor;

  return (
    <div className="bg-[#1a1d2e] border border-[#2a2a2a] rounded-lg p-6 hover:border-[#3a3a3a] transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">{post.title}</h3>
          <div className="flex items-center gap-4 text-sm text-[#8f8f8f]">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{post.author?.name || user?.name || 'Usuario'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{timeAgo}</span>
            </div>
          </div>
        </div>

        {/* Acciones (admin o autor) */}
        {(canEdit || canDelete) && (
          <div className="flex gap-2 ml-4">
            {canEdit && (
              <button
                onClick={() => onEdit?.(post)}
                className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors"
                title="Editar"
              >
                <Edit2 className="w-4 h-4 text-blue-400" />
              </button>
            )}
            {canDelete && (
              <button
                onClick={() => onDelete?.(post._id)}
                className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors"
                title="Eliminar"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Contenido */}
      <p className="text-[#b0b0b0] mb-4 line-clamp-3">{post.content}</p>

      {/* Footer */}
      <div className="flex items-center gap-2 text-[#8f8f8f] text-sm">
        <MessageSquare className="w-4 h-4" />
        <span>Publicación</span>
      </div>
    </div>
  );
};
