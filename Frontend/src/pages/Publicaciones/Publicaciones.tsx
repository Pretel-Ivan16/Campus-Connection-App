import { useState, useEffect } from 'react';
import { postService } from '../../services/post.service';
import { CreatePostModal } from '../../components/posts/CreatePostModal';
import { PostsList } from '../../components/posts/PostsList';
import { useAuth } from '../../hooks/useAuth';
import { useFaculties } from '../../hooks/useFaculties';
import type { Post } from '../../types/posts.types';

export default function Publicaciones() {
  const { user } = useAuth();
  const { faculties } = useFaculties();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedFacultyId, setSelectedFacultyId] = useState<string>('');

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

  useEffect(() => {
    if (faculties.length > 0 && !selectedFacultyId) {
      setSelectedFacultyId(faculties[0]._id);
    }
  }, [faculties]);

  const handlePostCreated = () => {
    fetchPosts();
  };

  const filteredPosts = selectedFacultyId 
    ? posts.filter((p) => p.facultyId === selectedFacultyId)
    : posts;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#06070b' }}>
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        {/* Hero Header */}
        <div className="mb-10 animate-fadeIn">
          <div className="rounded-3xl p-8 text-white mb-8 shadow-2xl" style={{ backgroundColor: '#6483ff' }}>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl md:text-5xl font-black">Publicaciones</h1>
            </div>
            <p className="text-[#eee] text-lg">Comparte, aprende y conecta con la comunidad</p>
          </div>

          {faculties.length > 0 && (
            <div className="mb-8">
              <label className="block text-sm font-bold text-white mb-3">
                Filtrar por facultad:
              </label>
              <select
                value={selectedFacultyId}
                onChange={(e) => setSelectedFacultyId(e.target.value)}
                className="w-full border-2 rounded-xl px-4 py-3 text-white focus:outline-none transition-all duration-300 font-medium cursor-pointer"
                style={{
                  backgroundColor: '#171a24',
                  borderColor: '#6483ff',
                  '--tw-ring-color': '#6483ff'
                } as React.CSSProperties}
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
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-900/30 border-2 border-red-500/50 rounded-xl backdrop-blur-sm">
            <p className="text-red-300 font-medium">Error: {error}</p>
            <button
              onClick={fetchPosts}
              className="mt-2 text-red-400 hover:text-red-300 underline font-semibold transition-colors"
            >
              Reintentar
            </button>
          </div>
        )}

        <PostsList
          posts={filteredPosts}
          isAuthenticated={!!user}
          isLoading={isLoading}
          onPostCreated={handlePostCreated}
          onCreatePostClick={() => setIsCreateModalOpen(true)}
        />

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
}
