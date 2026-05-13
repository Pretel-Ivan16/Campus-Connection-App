import { useState, useEffect } from 'react';
import { postService } from '../services/post.service';
import type { Post } from '../types/posts.types';

export const usePostsByFaculty = (facultyId: string) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!facultyId) {
      setIsLoading(false);
      return;
    }

    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await postService.getPostsByFaculty(facultyId);
        setPosts(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error al cargar los posts';
        setError(message);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [facultyId]);

  const refetchPosts = async () => {
    try {
      setIsLoading(true);
      const data = await postService.getPostsByFaculty(facultyId);
      setPosts(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al recargar los posts';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { posts, isLoading, error, refetchPosts };
};
