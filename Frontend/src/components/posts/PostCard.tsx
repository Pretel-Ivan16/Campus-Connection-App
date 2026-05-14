import { MessageSquare, Calendar, Trash2, Edit2, Heart } from 'lucide-react';
import type { Post } from '../../types/posts.types';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';

interface PostCardProps {
  post: Post;
  isAdmin?: boolean;
  onEdit?: (post: Post) => void;
  onDelete?: (postId: string) => void;
}

export const PostCard = ({
  post,
  isAdmin = false,
  onEdit,
  onDelete,
}: PostCardProps) => {
  const { user } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const createdAt = new Date(post.createdAt);
  const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true, locale: es });
  
  const isAuthor = user?.userId === post.authorId;
  const canEdit = isAdmin || isAuthor;
  const canDelete = isAdmin || isAuthor;

  const gradients = [
    '#6483ff',
    '#4ba3f7',
    '#6483ff',
    '#4ba3f7',
    '#6483ff',
  ];
  const gradientIndex = post._id.charCodeAt(0) % gradients.length;
  const gradient = gradients[gradientIndex];

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`bg-[#0d0f16] rounded-2xl overflow-hidden transition-all duration-300 transform ${
        isHovered ? 'scale-105 shadow-2xl shadow-[#6483ff]/20' : 'shadow-lg shadow-black/30'
      }`}
    >
      <div className="h-1" style={{ backgroundColor: Array.isArray(gradient) ? '#6483ff' : gradient }} />
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: '#6483ff' }}>
              {(post.author?.name || user?.name || 'U').charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">{post.author?.name || user?.name || 'Usuario'}</p>
              <p className="text-xs flex items-center gap-1" style={{ color: '#8f8f8f' }}>
                <Calendar className="w-3 h-3" />
                {timeAgo}
              </p>
            </div>
          </div>

          {(canEdit || canDelete) && (
            <div className={`flex gap-2 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}>
              {canEdit && (
                <button
                  onClick={() => onEdit?.(post)}
                  className="p-2 hover:bg-[#6483ff]/10 rounded-lg transition-all duration-200"
                  title="Editar"
                >
                  <Edit2 className="w-4 h-4" style={{ color: '#6483ff' }} />
                </button>
              )}
              {canDelete && (
                <button
                  onClick={() => onDelete?.(post._id)}
                  className="p-2 hover:bg-[#d40924]/10 rounded-lg transition-all duration-200"
                  title="Eliminar"
                >
                  <Trash2 className="w-4 h-4" style={{ color: '#d40924' }} />
                </button>
              )}
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 hover:text-[#6483ff] transition-colors">
          {post.title}
        </h3>

        <p className="text-gray-300 mb-4 line-clamp-4 leading-relaxed text-sm">
          {post.content}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-[#252933]">
          <div className="flex items-center gap-4 text-xs text-[#8f8f8f]">
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className="flex items-center gap-1 hover:text-[#6483ff] transition-colors"
            >
              <Heart className={`w-4 h-4 transition-all ${
                isLiked ? 'fill-[#6483ff]' : ''
              }`} style={{ color: isLiked ? '#6483ff' : '#8f8f8f' }} />
              <span>{isLiked ? '1' : '0'}</span>
            </button>
            <div className="flex items-center gap-1 hover:text-[#4ba3f7] transition-colors cursor-pointer">
              <MessageSquare className="w-4 h-4" />
              <span>0</span>
            </div>
          </div>
          <span className="text-xs text-[#252933]">Publicacion</span>
        </div>
      </div>
    </div>
  );
};
