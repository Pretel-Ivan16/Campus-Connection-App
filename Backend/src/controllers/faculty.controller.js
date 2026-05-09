import * as facultyService from '../services/faculty.service.js';
import { ServerError } from '../helpers/errors.js';

/*

  FacultyController - Maneja HTTP requests para facultades
  Solo maneja req/res
  TODA la lógica está en faculty.service.js

*/

/*

  Crea una nueva facultad
  POST /faculties

*/

export const createFaculty = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Llamar servicio
    const newFaculty = await facultyService.createFaculty({
      name,
      description,
    });

    // Respuesta exitosa
    res.status(201).json({
      success: true,
      message: 'Faculty created successfully',
      data: newFaculty,
    });
  } catch (error) {
    // Manejo de errores
    const status = error.status || 500;
    const message = error.message || 'Error creating faculty';

    res.status(status).json({
      success: false,
      message,
    });
  }
};

/*

  Obtiene todas las facultades
  GET /faculties

*/
export const getAllFaculties = async (req, res) => {
  try {
    // Llamar servicio
    const faculties = await facultyService.getAllFaculties();

    // Respuesta exitosa
    res.status(200).json({
      success: true,
      message: 'Faculties fetched successfully',
      data: faculties,
    });
  } catch (error) {
    // Manejo de errores
    const status = error.status || 500;
    const message = error.message || 'Error fetching faculties';

    res.status(status).json({
      success: false,
      message,
    });
  }
};

/*

  Obtiene una facultad por ID
  GET /faculties/:id

*/
export const getFacultyById = async (req, res) => {
  try {
    const { id } = req.params;

    // Llamar servicio
    const faculty = await facultyService.getFacultyById(id);

    // Respuesta exitosa
    res.status(200).json({
      success: true,
      message: 'Faculty fetched successfully',
      data: faculty,
    });
  } catch (error) {
    // Manejo de errores
    const status = error.status || 500;
    const message = error.message || 'Error fetching faculty';

    res.status(status).json({
      success: false,
      message,
    });
  }
};

/*

  Actualiza una facultad
  PUT /faculties/:id

*/

export const updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Llamar servicio
    const updatedFaculty = await facultyService.updateFaculty(id, updateData);

    // Respuesta exitosa
    res.status(200).json({
      success: true,
      message: 'Faculty updated successfully',
      data: updatedFaculty,
    });
  } catch (error) {
    // Manejo de errores
    const status = error.status || 500;
    const message = error.message || 'Error updating faculty';

    res.status(status).json({
      success: false,
      message,
    });
  }
};

/*

  Elimina una facultad
  DELETE /faculties/:id

*/

export const deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;

    // Llamar servicio
    const deletedFaculty = await facultyService.deleteFaculty(id);

    // Respuesta exitosa
    res.status(200).json({
      success: true,
      message: 'Faculty deleted successfully',
      data: deletedFaculty,
    });
  } catch (error) {
    // Manejo de errores
    const status = error.status || 500;
    const message = error.message || 'Error deleting faculty';

    res.status(status).json({
      success: false,
      message,
    });
  }
};

/*

  Obtiene el total de facultades
  GET /faculties/count/total

*/

export const getFacultyCount = async (req, res) => {
  try {
    // Llamar servicio
    const count = await facultyService.getFacultyCount();

    // Respuesta exitosa
    res.status(200).json({
      success: true,
      message: 'Faculty count fetched successfully',
      data: { count },
    });
  } catch (error) {
    // Manejo de errores
    const status = error.status || 500;
    const message = error.message || 'Error fetching faculty count';

    res.status(status).json({
      success: false,
      message,
    });
  }
};
