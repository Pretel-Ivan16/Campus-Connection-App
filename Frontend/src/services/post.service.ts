import apiClient from '../utils/apiClient';
import type { Post, CreatePostRequest, UpdatePostRequest } from '../types/posts.types';

export const postService = {
  // Obtener todos los posts
  getAllPosts: async (): Promise<Post[]> => {
    const response = await apiClient.get('/posts');
    return response.data.data || [];
  },

  // Obtener post por ID
  getPostById: async (id: string): Promise<Post> => {
    const response = await apiClient.get(`/posts/${id}`);
    return response.data.data;
  },

  // Obtener posts por facultad
  getPostsByFaculty: async (facultyId: string): Promise<Post[]> => {
    const response = await apiClient.get(`/posts/faculty/${facultyId}`);
    return response.data.data || [];
  },

  // Obtener posts por autor
  getPostsByAuthor: async (authorId: string): Promise<Post[]> => {
    const response = await apiClient.get(`/posts/author/${authorId}`);
    return response.data.data || [];
  },

  // Crear post (solo autenticados y admins)
  createPost: async (data: CreatePostRequest): Promise<Post> => {
    const response = await apiClient.post('/posts', data);
    return response.data.data;
  },

  // Actualizar post (solo autor o admin)
  updatePost: async (id: string, data: UpdatePostRequest): Promise<Post> => {
    const response = await apiClient.put(`/posts/${id}`, data);
    return response.data.data;
  },

  // Eliminar post (solo autor o admin)
  deletePost: async (id: string): Promise<void> => {
    await apiClient.delete(`/posts/${id}`);
  },
};
