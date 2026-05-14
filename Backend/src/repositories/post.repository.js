import Post from '../models/post.model.js';
import { BaseRepository } from './base.repository.js';

/*

 * PostRepository - Repository para operaciones con posts
 * Extiende BaseRepository para reutilizar lógica CRUD genérica
 * Especializado en operaciones con populate para relaciones

*/
export class PostRepository extends BaseRepository {
  constructor() {
    super(Post);
  }

  // Opciones de populate reutilizables
  static POPULATE_OPTIONS = [
    {
      path: 'authorId',
      select: 'name email',
    },
    {
      path: 'facultyId',
      select: 'name description',
    },
  ];

  /*
    Crea un nuevo post con populate
  */
  async createPost(postData) {
    try {
      const { title, content, authorId, facultyId } = postData;

      if (!title || !content || !authorId || !facultyId) {
        throw new Error('Title, content, authorId and facultyId are required');
      }

      const cleanData = {
        title: title.trim(),
        content: content.trim(),
        authorId,
        facultyId,
      };

      const post = new this.Model(cleanData);
      const savedPost = await post.save();

      return await savedPost.populate(PostRepository.POPULATE_OPTIONS);
    } catch (error) {
      throw new Error(`Error creating post: ${error.message}`);
    }
  }

  /*
    Obtiene todos los posts con populate
  */
  async getAllPosts() {
    return this.findAll({
      sort: { createdAt: -1 },
      populate: PostRepository.POPULATE_OPTIONS,
    });
  }

  /*
    Obtiene post por ID con populate
  */
  async getPostById(postId) {
    return this.findById(postId, {
      populate: PostRepository.POPULATE_OPTIONS,
    });
  }

  /*
    Actualiza post con populate
  */
  async updatePost(postId, updateData) {
    return this.update(postId, updateData, {
      populate: PostRepository.POPULATE_OPTIONS,
    });
  }

  /*
    Elimina post
  */
  async deletePost(postId) {
    return this.delete(postId);
  }

  /*
    Obtiene posts de un autor
  */
  async getPostsByAuthor(authorId) {
    return this.findAll({
      query: { authorId },
      sort: { createdAt: -1 },
      populate: PostRepository.POPULATE_OPTIONS,
    });
  }

  /*
    Obtiene posts de una facultad
  */
  async getPostsByFaculty(facultyId) {
    return this.findAll({
      query: { facultyId },
      sort: { createdAt: -1 },
      populate: PostRepository.POPULATE_OPTIONS,
    });
  }
}

// Exportar funciones para compatibilidad con código existente
export const createPost = async (postData) => {
  const repo = new PostRepository();
  return repo.createPost(postData);
};

export const getAllPosts = async () => {
  const repo = new PostRepository();
  return repo.getAllPosts();
};

export const getPostById = async (postId) => {
  const repo = new PostRepository();
  return repo.getPostById(postId);
};

export const updatePost = async (postId, updateData) => {
  const repo = new PostRepository();
  return repo.updatePost(postId, updateData);
};

export const deletePost = async (postId) => {
  const repo = new PostRepository();
  return repo.deletePost(postId);
};

export const getPostsByAuthor = async (authorId) => {
  const repo = new PostRepository();
  return repo.getPostsByAuthor(authorId);
};

export const getPostsByFaculty = async (facultyId) => {
  const repo = new PostRepository();
  return repo.getPostsByFaculty(facultyId);
};

// Exportar clase y singleton
export default new PostRepository();
