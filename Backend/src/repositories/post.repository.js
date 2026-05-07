import Post from '../models/post.model.js';

/**
 * Repository para operaciones CRUD de Posts
 * Centraliza todo acceso a datos relacionado con posts en MongoDB
 */

export const createPost = async (postData) => {
  try {
    if (!postData) {
      throw new Error('Post data is required');
    }

    // Validar que tenga los campos requeridos
    const { title, content, authorId, facultyId } = postData;
    if (!title || !content || !authorId || !facultyId) {
      throw new Error('Title, content, authorId and facultyId are required');
    }

    // Crear instancia del post
    const post = new Post({
      title: title.trim(),
      content: content.trim(),
      authorId,
      facultyId,
    });

    // Guardar en base de datos
    const savedPost = await post.save();

    // Retornar post con relaciones populadas
    return await savedPost.populate([
      {
        path: 'authorId',
        select: 'email createdAt',
      },
      {
        path: 'facultyId',
        select: 'name description',
      },
    ]);
  } catch (error) {
    throw new Error(`Error creating post: ${error.message}`);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await Post.find()
      .populate({
        path: 'authorId',
        select: 'email createdAt',
      })
      .populate({
        path: 'facultyId',
        select: 'name description',
      })
      .sort({ createdAt: -1 }); // Ordenar por fecha descendente (más recientes primero)

    return posts;
  } catch (error) {
    throw new Error(`Error fetching all posts: ${error.message}`);
  }
};

export const getPostById = async (postId) => {
  try {
    if (!postId) {
      throw new Error('Post ID is required');
    }

    const post = await Post.findById(postId)
      .populate({
        path: 'authorId',
        select: 'email createdAt',
      })
      .populate({
        path: 'facultyId',
        select: 'name description',
      });

    if (!post) {
      throw new Error('Post not found');
    }

    return post;
  } catch (error) {
    throw new Error(`Error fetching post by ID: ${error.message}`);
  }
};

export const updatePost = async (postId, updateData) => {
  try {
    if (!postId) {
      throw new Error('Post ID is required');
    }

    if (!updateData || Object.keys(updateData).length === 0) {
      throw new Error('Update data is required');
    }

    // Limpiar datos
    const cleanData = {};
    if (updateData.title) {
      cleanData.title = updateData.title.trim();
    }
    if (updateData.content) {
      cleanData.content = updateData.content.trim();
    }

    // Actualizar y devolver post actualizado
    const updatedPost = await Post.findByIdAndUpdate(postId, cleanData, {
      new: true, // Retorna documento actualizado
      runValidators: true, // Ejecuta validadores del schema
    })
      .populate({
        path: 'authorId',
        select: 'email createdAt',
      })
      .populate({
        path: 'facultyId',
        select: 'name description',
      });

    if (!updatedPost) {
      throw new Error('Post not found');
    }

    return updatedPost;
  } catch (error) {
    throw new Error(`Error updating post: ${error.message}`);
  }
};

export const deletePost = async (postId) => {
  try {
    if (!postId) {
      throw new Error('Post ID is required');
    }

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      throw new Error('Post not found');
    }

    return deletedPost;
  } catch (error) {
    throw new Error(`Error deleting post: ${error.message}`);
  }
};

export const getPostsByAuthor = async (authorId) => {
  try {
    if (!authorId) {
      throw new Error('Author ID is required');
    }

    const posts = await Post.find({ authorId })
      .populate({
        path: 'authorId',
        select: 'email createdAt',
      })
      .populate({
        path: 'facultyId',
        select: 'name description',
      })
      .sort({ createdAt: -1 });

    return posts;
  } catch (error) {
    throw new Error(`Error fetching posts by author: ${error.message}`);
  }
};


export const getPostsByFaculty = async (facultyId) => {
  try {
    if (!facultyId) {
      throw new Error('Faculty ID is required');
    }

    const posts = await Post.find({ facultyId })
      .populate({
        path: 'authorId',
        select: 'email createdAt',
      })
      .populate({
        path: 'facultyId',
        select: 'name description',
      })
      .sort({ createdAt: -1 });

    return posts;
  } catch (error) {
    throw new Error(`Error fetching posts by faculty: ${error.message}`);
  }
};
