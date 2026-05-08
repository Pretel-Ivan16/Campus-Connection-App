import facultyRepository from '../repositories/faculty.repository.js';
import {
  ValidationError,
  NotFoundError,
  ConflictError,
} from '../helpers/errors.js';

/*
  FacultyService - Lógica de negocio para facultades
  Maneja validaciones y reglas de negocio
  NO maneja req/res
  SOLO usa repositories para acceso a datos
*/

export const createFaculty = async (facultyData) => {
  try {
    // Validar datos de entrada
    if (!facultyData) {
      throw new ValidationError('Faculty data is required');
    }

    const { name, description } = facultyData;

    // Validar campo requerido
    if (!name || !name.trim()) {
      throw new ValidationError('Faculty name is required');
    }

    // Validar longitud del nombre
    if (name.trim().length < 3) {
      throw new ValidationError('Faculty name must be at least 3 characters long');
    }

    const trimmedName = name.trim();

    // Verificar que el nombre no exista ya (no duplicados)
    const facultyExists = await facultyRepository.facultyNameExists(trimmedName);

    if (facultyExists) {
      throw new ConflictError(`Faculty with name "${trimmedName}" already exists`);
    }

    // Preparar datos para crear facultad
    const facultyDataToCreate = {
      name: trimmedName,
      description: description ? description.trim() : undefined,
    };

    // Crear facultad mediante repository
    const createdFaculty = await facultyRepository.createFaculty(facultyDataToCreate);

    return createdFaculty;
  } catch (error) {
    throw new Error(`Error creating faculty: ${error.message}`);
  }
};
export const getAllFaculties = async () => {
  try {
    const faculties = await facultyRepository.getAllFaculties();
    return faculties;
  } catch (error) {
    throw new Error(`Error fetching all faculties: ${error.message}`);
  }
};

/*

  Obtiene una facultad por ID

*/

export const getFacultyById = async (facultyId) => {
  try {
    if (!facultyId) {
      throw new ValidationError('Faculty ID is required');
    }

    const faculty = await facultyRepository.getFacultyById(facultyId);

    if (!faculty) {
      throw new NotFoundError('Faculty not found');
    }

    return faculty;
  } catch (error) {
    throw new Error(`Error fetching faculty: ${error.message}`);
  }
};

/*

Actualiza una facultad

*/

export const updateFaculty = async (facultyId, updateData) => {
  try {
    if (!facultyId) {
      throw new ValidationError('Faculty ID is required');
    }

    if (!updateData || Object.keys(updateData).length === 0) {
      throw new ValidationError('Update data is required');
    }

    // Verificar que la facultad exista
    const currentFaculty = await facultyRepository.getFacultyById(facultyId);

    if (!currentFaculty) {
      throw new NotFoundError('Faculty not found');
    }

    // Validar y preparar datos
    const cleanData = {};

    // Validar nombre si se proporciona
    if (updateData.name !== undefined) {
      const trimmedName = updateData.name.trim();

      if (!trimmedName) {
        throw new ValidationError('Faculty name cannot be empty');
      }

      if (trimmedName.length < 3) {
        throw new ValidationError('Faculty name must be at least 3 characters long');
      }

      // Verificar que el nombre no exista ya (si es diferente del actual)
      if (trimmedName !== currentFaculty.name) {
        const nameExists = await facultyRepository.facultyNameExists(trimmedName);

        if (nameExists) {
          throw new ConflictError(`Faculty with name "${trimmedName}" already exists`);
        }
      }

      cleanData.name = trimmedName;
    }

    // Validar descripción si se proporciona
    if (updateData.description !== undefined) {
      const trimmedDescription = updateData.description.trim();

      if (trimmedDescription) {
        if (trimmedDescription.length < 3) {
          throw new ValidationError('Faculty description must be at least 3 characters long');
        }

        cleanData.description = trimmedDescription;
      } else {
        // Permitir descripción vacía
        cleanData.description = '';
      }
    }

    if (Object.keys(cleanData).length === 0) {
      throw new ValidationError('No valid fields to update');
    }

    // Actualizar facultad mediante repository
    const updatedFaculty = await facultyRepository.updateFaculty(facultyId, cleanData);

    return updatedFaculty;
  } catch (error) {
    throw new Error(`Error updating faculty: ${error.message}`);
  }
};

/*

Elimina una facultad

*/

export const deleteFaculty = async (facultyId) => {
  try {
    if (!facultyId) {
      throw new ValidationError('Faculty ID is required');
    }

    // Verificar que la facultad exista
    const currentFaculty = await facultyRepository.getFacultyById(facultyId);

    if (!currentFaculty) {
      throw new NotFoundError('Faculty not found');
    }

    // TODO: Considerar impacto en posts antes de eliminar
    // Por ahora permitimos la eliminación

    // Eliminar facultad mediante repository
    const deletedFaculty = await facultyRepository.deleteFaculty(facultyId);

    return deletedFaculty;
  } catch (error) {
    throw new Error(`Error deleting faculty: ${error.message}`);
  }
};

/*
  Obtiene el total de facultades
*/
export const getFacultyCount = async () => {
  try {
    const count = await facultyRepository.getFacultyCount();
    return count;
  } catch (error) {
    throw new Error(`Error counting faculties: ${error.message}`);
  }
};
