import { useState, useEffect } from 'react';
import { Plus, MessageCircle } from 'lucide-react';
import { postService } from '../services/post.service';
import { CreatePostModal } from '../components/posts/CreatePostModal';
import { PostsList } from '../components/posts/PostsList';
import { useAuth } from '../hooks/useAuth';
import { useFaculties } from '../hooks/useFaculties';
import type { Post } from '../types/posts.types';

export default function Foros() {
  const { user } = useAuth();
  const { faculties } = useFaculties();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedFacultyId, setSelectedFacultyId] = useState<string>('');

  useEffect(() => {
    // Set default faculty if available
    if (faculties.length > 0 && !selectedFacultyId) {
      setSelectedFacultyId(faculties[0]._id);
    }
  }, [faculties, selectedFacultyId]);

  // Cargar foros (posts)
  const fetchForums = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await postService.getAllPosts();
      setPosts(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar los foros';
      setError(message);
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchForums();
  }, []);

  const handleForumCreated = () => {
    fetchForums();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="w-8 h-8 text-blue-500" />
              <h1 className="text-4xl font-bold text-white">Foros de Discusión</h1>
            </div>
            <p className="text-[#b0b0b0]">Crea y participa en discusiones con otros estudiantes</p>
          </div>

          {/* Botón crear foro */}
          {user && selectedFacultyId && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              Nuevo foro
            </button>
          )}
        </div>

        {/* Selector de facultad */}
        {faculties.length > 0 && (
          <div className="mb-8">
            <label className="block text-sm font-medium text-[#b0b0b0] mb-2">
              Selecciona una facultad:
            </label>
            <select
              value={selectedFacultyId}
              onChange={(e) => setSelectedFacultyId(e.target.value)}
              className="w-full bg-[#1a1d2e] border border-[#2a2a2a] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="">Elige una facultad para crear un foro</option>
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
              onClick={fetchForums}
              className="mt-2 text-red-400 hover:text-red-300 underline"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && posts.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-[#4a4a4a] mx-auto mb-4" />
            <p className="text-[#8f8f8f] text-lg mb-4">No hay foros aún</p>
            {user && selectedFacultyId && (
              <p className="text-[#6f6f6f] text-sm mb-6">
                Sé el primero en crear un foro de discusión
              </p>
            )}
            {user && selectedFacultyId && (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
                Crear primer foro
              </button>
            )}
          </div>
        )}

        {/* Forums list */}
        {posts.length > 0 && (
          <PostsList
            posts={selectedFacultyId ? posts.filter((p) => p.facultyId === selectedFacultyId) : posts}
            isAuthenticated={!!user}
            isLoading={isLoading}
            onPostCreated={handleForumCreated}
            onCreatePostClick={() => setIsCreateModalOpen(true)}
            facultyId={selectedFacultyId}
          />
        )}

        {/* Create forum modal */}
        {selectedFacultyId && (
          <CreatePostModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            facultyId={selectedFacultyId}
            onPostCreated={handleForumCreated}
          />
        )}
      </div>
    </div>
  );
}
