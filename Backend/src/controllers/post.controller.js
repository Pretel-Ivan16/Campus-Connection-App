import * as postService from '../services/post.service.js';
import { ServerError } from '../helpers/errors.js';

/*

  PostController - Maneja HTTP requests para posts
  Solo maneja req/res
  TODA la lógica está en post.service.js

*/

/*

  Crea un nuevo post
  POST /posts

*/

export const createPost = async (req, res) => {
  try {
    const { title, content, facultyId } = req.body;
    const userId = req.user?.userId;

    // Llamar servicio
    const newPost = await postService.createPost(
      { title, content, facultyId },
      userId
    );

    // Respuesta exitosa
    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: newPost,
    });
  } catch (error) {
    // Manejo de errores
    const status = error.status || 500;
    const message = error.message || 'Error creating post';

    res.status(status).json({
      success: false,
      message,
    });
  }
};

/*

  Obtiene todos los posts
  GET /posts

*/

export const getAllPosts = async (req, res) => {
  try {
    // Llamar servicio
    const posts = await postService.getAllPosts();

    // Respuesta exitosa
    res.status(200).json({
      success: true,
      message: 'Posts fetched successfully',
      data: posts,
    });
  } catch (error) {
    // Manejo de errores
    const status = error.status || 500;
    const message = error.message || 'Error fetching posts';

    res.status(status).json({
      success: false,
      message,
    });
  }
};

/*

  Obtiene un post por ID
  GET /posts/:id

*/

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    // Llamar servicio
    const post = await postService.getPostById(id);

    // Respuesta exitosa
    res.status(200).json({
      success: true,
      message: 'Post fetched successfully',
      data: post,
    });
  } catch (error) {
    // Manejo de errores
    const status = error.status || 500;
    const message = error.message || 'Error fetching post';

    res.status(status).json({
      success: false,
      message,
    });
  }
};

/*

  Actualiza un post (solo el autor)
  PUT /posts/:id

*/

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;
    const updateData = req.body;

    // Llamar servicio
    const updatedPost = await postService.updatePost(id, updateData, userId);

    // Respuesta exitosa
    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data: updatedPost,
    });
  } catch (error) {
    // Manejo de errores
    const status = error.status || 500;
    const message = error.message || 'Error updating post';

    res.status(status).json({
      success: false,
      message,
    });
  }
};

/*

  Elimina un post (solo el autor)
  DELETE /posts/:id

*/

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    // Llamar servicio
    const deletedPost = await postService.deletePost(id, userId);

    // Respuesta exitosa
    res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
      data: deletedPost,
    });
  } catch (error) {
    // Manejo de errores
    const status = error.status || 500;
    const message = error.message || 'Error deleting post';

    res.status(status).json({
      success: false,
      message,
    });
  }
};

/*

  Obtiene posts de un autor específico
  GET /posts/author/:authorId

*/

export const getPostsByAuthor = async (req, res) => {
  try {
    const { authorId } = req.params;

    // Llamar servicio
    const posts = await postService.getPostsByAuthor(authorId);

    // Respuesta exitosa
    res.status(200).json({
      success: true,
      message: 'Posts by author fetched successfully',
      data: posts,
    });
  } catch (error) {
    // Manejo de errores
    const status = error.status || 500;
    const message = error.message || 'Error fetching posts by author';

    res.status(status).json({
      success: false,
      message,
    });
  }
};

/*

  Obtiene posts de una facultad específica
  GET /posts/faculty/:facultyId

*/

export const getPostsByFaculty = async (req, res) => {
  try {
    const { facultyId } = req.params;

    // Llamar servicio
    const posts = await postService.getPostsByFaculty(facultyId);

    // Respuesta exitosa
    res.status(200).json({
      success: true,
      message: 'Posts by faculty fetched successfully',
      data: posts,
    });
  } catch (error) {
    // Manejo de errores
    const status = error.status || 500;
    const message = error.message || 'Error fetching posts by faculty';

    res.status(status).json({
      success: false,
      message,
    });
  }
};
