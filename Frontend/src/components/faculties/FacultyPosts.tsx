import { useState } from 'react';
import { usePostsByFaculty } from '../../hooks/usePostsByFaculty';
import { useAuth } from '../../hooks/useAuth';
import { PostsList } from '../posts/PostsList';
import { CreatePostModal } from '../posts/CreatePostModal';

interface FacultyPostsProps {
  facultyId: string;
}

export const FacultyPosts = ({ facultyId }: FacultyPostsProps) => {
  const { user } = useAuth();
  const { posts, isLoading, error, refetchPosts } = usePostsByFaculty(facultyId);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Verificar si el usuario está autenticado
  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  // Manejar error en la carga
  if (error) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Publicaciones</h2>
        <p className="text-red-500">Error al cargar las publicaciones: {error}</p>
      </div>
    );
  }

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Publicaciones</h2>

        <PostsList
          posts={posts}
          isAdmin={isAdmin}
          isAuthenticated={isAuthenticated}
          isLoading={isLoading}
          onPostCreated={refetchPosts}
          onCreatePostClick={() => setIsCreateModalOpen(true)}
        />
      </div>

      {/* Modal para crear publicación */}
      {isAuthenticated && (
        <CreatePostModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          facultyId={facultyId}
          onPostCreated={refetchPosts}
        />
      )}
    </>
  );
};
