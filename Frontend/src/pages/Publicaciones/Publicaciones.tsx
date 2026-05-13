import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { postService } from '../../services/post.service';
import { CreatePostModal } from '../../components/posts/CreatePostModal';
import { PostsList } from '../../components/posts/PostsList';
import { useAuth } from '../../hooks/useAuth';
import { useFaculties } from '../../hooks/useFaculties';
import type { Post } from '../../types/posts.types';

export const Publicaciones = () => {
  const { user } = useAuth();
  const { faculties } = useFaculties();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedFacultyId, setSelectedFacultyId] = useState<string>('');

  // Cargar posts
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await postService.getAllPosts();
      setPosts(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar las publicaciones';
      setError(message);
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Establecer facultad por defecto cuando se cargan
  useEffect(() => {
    if (faculties.length > 0 && !selectedFacultyId) {
      setSelectedFacultyId(faculties[0]._id);
    }
  }, [faculties]);

  const handlePostCreated = () => {
    fetchPosts();
  };

  // Filtrar posts por facultad seleccionada (si está seleccionada)
  const filteredPosts = selectedFacultyId 
    ? posts.filter((p) => p.facultyId === selectedFacultyId)
    : posts;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Publicaciones</h1>
            <p className="text-[#b0b0b0]">Todas las publicaciones de la comunidad</p>
          </div>

          {/* Botón crear publicación */}
          {user && selectedFacultyId && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              Nueva publicación
            </button>
          )}
        </div>

        {/* Selector de facultad */}
        {faculties.length > 0 && (
          <div className="mb-8">
            <label className="block text-sm font-medium text-[#b0b0b0] mb-2">
              Filtrar por facultad:
            </label>
            <select
              value={selectedFacultyId}
              onChange={(e) => setSelectedFacultyId(e.target.value)}
              className="w-full bg-[#1a1d2e] border border-[#2a2a2a] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="">Todas las facultades</option>
              {faculties.map((faculty) => (
                <option key={faculty._id} value={faculty._id}>
                  {faculty.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="mb-8 p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
            <p className="text-red-400">{error}</p>
            <button
              onClick={fetchPosts}
              className="mt-2 text-red-400 hover:text-red-300 underline"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Posts list */}
        <PostsList
          posts={filteredPosts}
          isAuthenticated={!!user}
          isLoading={isLoading}
          onPostCreated={handlePostCreated}
          onCreatePostClick={() => setIsCreateModalOpen(true)}
          facultyId={selectedFacultyId}
        />

        {/* Create post modal */}
        {selectedFacultyId && (
          <CreatePostModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            facultyId={selectedFacultyId}
            onPostCreated={handlePostCreated}
          />
        )}
      </div>
    </div>
  );
};

export default Publicaciones;
