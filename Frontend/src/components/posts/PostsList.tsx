import { useState } from 'react';
import { postService } from '../../services/post.service';
import { PostCard } from './PostCard';
import { EditPostModal } from './EditPostModal';
import type { Post } from '../../types/posts.types';
import toast from 'react-hot-toast';

interface PostsListProps {
  posts: Post[];
  isAdmin?: boolean;
  isAuthenticated?: boolean;
  isLoading?: boolean;
  onPostCreated?: () => void;
  onCreatePostClick?: () => void;
}

export const PostsList = ({
  posts,
  isAdmin = false,
  isAuthenticated = false,
  isLoading = false,
  onPostCreated,
  onCreatePostClick,
}: PostsListProps) => {
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const handleDelete = async (postId: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este post?')) return;

    try {
      await postService.deletePost(postId);
      toast.success('Post eliminado correctamente');
      onPostCreated?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al eliminar el post';
      toast.error(message);
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-linear-to-br from-gray-900 to-gray-950 rounded-2xl p-6 animate-pulse"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="h-1 bg-gray-700 rounded-full mb-4 w-1/4"></div>
            <div className="flex gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-700 rounded mb-2 w-2/3"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
            <div className="h-6 bg-gray-700 rounded mb-3 w-3/4"></div>
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-20 px-4">
        <div className="text-6xl mb-4" style={{ animation: 'bounce 2s infinite 0.2s' }}>
          📱
        </div>
        <p className="text-gray-400 mb-2 text-lg font-medium">No hay publicaciones aún</p>
        <p className="text-gray-500 mb-8 text-sm">Sé el primero en compartir tu conocimiento</p>
        {isAuthenticated && (
          <button
            onClick={onCreatePostClick}
            className="text-white px-8 py-3 rounded-xl transition-all duration-300 hover:shadow-lg font-semibold inline-flex items-center gap-2 hover:opacity-90"
            style={{ backgroundColor: '#6483ff' }}
          >
            + Crear primera publicación
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {isAuthenticated && (
        <button
          onClick={onCreatePostClick}
          className="w-full text-white px-6 py-4 rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg hover:opacity-90"
          style={{ backgroundColor: '#6483ff' }}
        >
          Nueva Publicación
        </button>
      )}

      <div className="space-y-6">
        {posts.map((post, index) => (
          <div
            key={post._id}
            style={{
              animation: `slideInUp 0.6s ease-out ${index * 100}ms both`,
            }}
          >
            <PostCard
              post={post}
              isAdmin={isAdmin}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        ))}
      </div>

      {isAuthenticated && (
        <EditPostModal
          isOpen={!!editingPost}
          onClose={() => setEditingPost(null)}
          post={editingPost}
          onPostUpdated={onPostCreated ?? (() => {})}
        />
      )}
    </div>
  );
};
