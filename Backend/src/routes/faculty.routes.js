import express from 'express';
import * as facultyController from '../controllers/faculty.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

/*

  Rutas de Facultades
  Prefijo: /api/faculties

*/

/*
  POST /api/faculties
  Crea una nueva facultad (requiere autenticación)
*/
router.post('/', authMiddleware, facultyController.createFaculty);

/*
  GET /api/faculties
  Obtiene todas las facultades
*/
router.get('/', facultyController.getAllFaculties);

/*
  GET /api/faculties/:id
  Obtiene una facultad por ID
*/
router.get('/:id', facultyController.getFacultyById);

/*
  PUT /api/faculties/:id
  Actualiza una facultad (requiere autenticación)
*/
router.put('/:id', authMiddleware, facultyController.updateFaculty);

/*
  DELETE /api/faculties/:id
  Elimina una facultad (requiere autenticación)
*/
router.delete('/:id', authMiddleware, facultyController.deleteFaculty);

/*
  GET /api/faculties/count/total
  Obtiene el número total de facultades
*/
router.get('/count/total', facultyController.getFacultyCount);

export default router;
