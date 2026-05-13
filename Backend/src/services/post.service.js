import postRepository from '../repositories/post.repository.js';
import facultyRepository from '../repositories/faculty.repository.js';

/**
 * PostService - Lógica de negocio para posts
 * Maneja validaciones, reglas de negocio y autorización
 * NO maneja req/res
 * SOLO usa repositories para acceso a datos
 */

/*

  Crea un nuevo post
  
*/
export const createPost = async (postData, userId) => {
  try {
    // Validar datos de entrada
    if (!postData) {
      throw new Error('Post data is required');
    }

    const { title, content, facultyId } = postData;

    // Validar campos requeridos
    if (!title || !title.trim()) {
      throw new Error('Post title is required');
    }

    if (!content || !content.trim()) {
      throw new Error('Post content is required');
    }

    if (!facultyId) {
      throw new Error('Faculty ID is required');
    }

    if (!userId) {
      throw new Error('User ID (author) is required');
    }

    // Validar longitud de título
    if (title.trim().length < 3) {
      throw new Error('Post title must be at least 3 characters long');
    }

    // Validar longitud de contenido
    if (content.trim().length < 10) {
      throw new Error('Post content must be at least 10 characters long');
    }

    // Verificar que la facultad exista
    const faculty = await facultyRepository.getFacultyById(facultyId);
    if (!faculty) {
      throw new Error('Faculty not found');
    }

    // Preparar datos para crear post
    const postDataToCreate = {
      title: title.trim(),
      content: content.trim(),
      authorId: userId,
      facultyId,
    };

    // Crear post mediante repository
    const createdPost = await postRepository.createPost(postDataToCreate);

    return createdPost;
  } catch (error) {
    throw new Error(`Error creating post: ${error.message}`);
  }
};

/*

  Obtiene todos los posts

*/
export const getAllPosts = async () => {
  try {
    const posts = await postRepository.getAllPosts();
    return posts;
  } catch (error) {
    throw new Error(`Error fetching all posts: ${error.message}`);
  }
};

/*

  Obtiene un post por ID

*/
export const getPostById = async (postId) => {
  try {
    if (!postId) {
      throw new Error('Post ID is required');
    }

    const post = await postRepository.getPostById(postId);

    if (!post) {
      throw new Error('Post not found');
    }

    return post;
  } catch (error) {
    throw new Error(`Error fetching post: ${error.message}`);
  }
};

/*

 * Actualiza un post
 * Solo el autor puede actualizar su post

*/
export const updatePost = async (postId, updateData, userId, userRole = 'user') => {
  try {
    if (!postId) {
      throw new Error('Post ID is required');
    }

    if (!userId) {
      throw new Error('User ID is required');
    }

    if (!updateData || Object.keys(updateData).length === 0) {
      throw new Error('Update data is required');
    }

    // Obtener el post actual
    const currentPost = await postRepository.getPostById(postId);

    if (!currentPost) {
      throw new Error('Post not found');
    }

    // Validar ownership o rol de admin
    const postAuthorId = currentPost.authorId?._id?.toString() || currentPost.authorId?.toString();
    const authenticatedUserId = userId.toString();
    const isAuthor = postAuthorId === authenticatedUserId;
    const isAdmin = userRole === 'admin';

    if (!isAuthor && !isAdmin) {
      throw new Error('Only the post author or an admin can update this post');
    }

    // Validar que solo se actualicen campos permitidos
    const cleanData = {};

    if (updateData.title !== undefined) {
      const trimmedTitle = updateData.title.trim();

      if (!trimmedTitle) {
        throw new Error('Post title cannot be empty');
      }

      if (trimmedTitle.length < 3) {
        throw new Error('Post title must be at least 3 characters long');
      }

      cleanData.title = trimmedTitle;
    }

    if (updateData.content !== undefined) {
      const trimmedContent = updateData.content.trim();

      if (!trimmedContent) {
        throw new Error('Post content cannot be empty');
      }

      if (trimmedContent.length < 10) {
        throw new Error('Post content must be at least 10 characters long');
      }

      cleanData.content = trimmedContent;
    }

    // Rechazar cualquier intento de cambiar authorId o facultyId
    if (updateData.authorId || updateData.facultyId) {
      throw new Error('Cannot update post author or faculty');
    }

    if (Object.keys(cleanData).length === 0) {
      throw new Error('No valid fields to update');
    }

    // Actualizar post mediante repository
    const updatedPost = await postRepository.updatePost(postId, cleanData);

    return updatedPost;
  } catch (error) {
    throw new Error(`Error updating post: ${error.message}`);
  }
};

/*

 * Elimina un post
 * Solo el autor puede eliminar su post

*/
export const deletePost = async (postId, userId, userRole = 'user') => {
  try {
    if (!postId) {
      throw new Error('Post ID is required');
    }

    if (!userId) {
      throw new Error('User ID is required');
    }

    // Obtener el post actual
    const currentPost = await postRepository.getPostById(postId);

    if (!currentPost) {
      throw new Error('Post not found');
    }

    // Validar ownership o rol de admin
    const postAuthorId = currentPost.authorId?._id?.toString() || currentPost.authorId?.toString();
    const authenticatedUserId = userId.toString();
    const isAuthor = postAuthorId === authenticatedUserId;
    const isAdmin = userRole === 'admin';

    if (!isAuthor && !isAdmin) {
      throw new Error('Only the post author or an admin can delete this post');
    }

    // Eliminar post mediante repository
    const deletedPost = await postRepository.deletePost(postId);

    return deletedPost;
  } catch (error) {
    throw new Error(`Error deleting post: ${error.message}`);
  }
};

/*

  Obtiene todos los posts de un autor específico

*/
export const getPostsByAuthor = async (authorId) => {
  try {
    if (!authorId) {
      throw new Error('Author ID is required');
    }

    const posts = await postRepository.getPostsByAuthor(authorId);
    return posts;
  } catch (error) {
    throw new Error(`Error fetching posts by author: ${error.message}`);
  }
};

/*

  Obtiene todos los posts de una facultad específica

*/
export const getPostsByFaculty = async (facultyId) => {
  try {
    if (!facultyId) {
      throw new Error('Faculty ID is required');
    }

    const posts = await postRepository.getPostsByFaculty(facultyId);
    return posts;
  } catch (error) {
    throw new Error(`Error fetching posts by faculty: ${error.message}`);
  }
};
