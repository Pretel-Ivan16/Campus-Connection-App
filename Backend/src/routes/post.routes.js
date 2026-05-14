import express from 'express';
import * as postController from '../controllers/post.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

/*

  Rutas de Posts
  Prefijo: /api/posts

*/

/*
  POST /api/posts
  Crea un nuevo post (requiere autenticación)
*/
router.post('/', authMiddleware, postController.createPost);

/*
  GET /api/posts
  Obtiene todos los posts
*/
router.get('/', postController.getAllPosts);

/*
  GET /api/posts/author/:authorId
  Obtiene posts de un autor específico
*/
router.get('/author/:authorId', postController.getPostsByAuthor);

/*
  GET /api/posts/faculty/:facultyId
  Obtiene posts de una facultad específica
*/
router.get('/faculty/:facultyId', postController.getPostsByFaculty);

/*
  GET /api/posts/:id
  Obtiene un post por ID
*/
router.get('/:id', postController.getPostById);

/*
  PUT /api/posts/:id
  Actualiza un post (requiere autenticación)
*/
router.put('/:id', authMiddleware, postController.updatePost);

/*
  DELETE /api/posts/:id
  Elimina un post (requiere autenticación)
*/
router.delete('/:id', authMiddleware, postController.deletePost);

export default router;
