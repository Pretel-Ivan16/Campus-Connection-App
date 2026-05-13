import { useState } from 'react';
import { postService } from '../../services/post.service';
import { PostCard } from './PostCard';
import { EditPostModal } from './EditPostModal';
import type { Post } from '../../types/posts.types';
import toast from 'react-hot-toast';

interface PostsListProps {
  posts: Post[];
  isAdmin?: boolean;
  isLoading?: boolean;
  onPostCreated?: () => void;
  onCreatePostClick?: () => void;
  facultyId?: string;
}

export const PostsList = ({
  posts,
  isAdmin = false,
  isLoading = false,
  onPostCreated,
  onCreatePostClick,
  facultyId,
}: PostsListProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const handleDelete = async (postId: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este post?')) return;

    try {
      setDeletingId(postId);
      await postService.deletePost(postId);
      toast.success('Post eliminado correctamente');
      onPostCreated?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al eliminar el post';
      toast.error(message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
  };

  // Estado de carga
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="bg-[#1a1d2e] border border-[#2a2a2a] rounded-lg p-6 animate-pulse"
          >
            <div className="h-6 bg-[#2a2a2a] rounded mb-2 w-2/3"></div>
            <div className="h-4 bg-[#2a2a2a] rounded mb-4 w-1/2"></div>
            <div className="h-4 bg-[#2a2a2a] rounded mb-2"></div>
            <div className="h-4 bg-[#2a2a2a] rounded w-5/6"></div>
          </div>
        ))}
      </div>
    );
  }

  // Sin posts
  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-[#8f8f8f] mb-4">No hay publicaciones aún</p>
        {isAdmin && (
          <button
            onClick={onCreatePostClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Crear primera publicación
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {isAdmin && (
        <button
          onClick={onCreatePostClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
        >
          + Nueva Publicación
        </button>
      )}

      <div className="space-y-3">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            isAdmin={isAdmin}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );

      {/* Modal para editar publicación */}
      {isAdmin && (
        <EditPostModal
          isOpen={!!editingPost}
          onClose={() => setEditingPost(null)}
          post={editingPost}
          onPostUpdated={onPostCreated ?? (() => {})}
        />
      )}
};
