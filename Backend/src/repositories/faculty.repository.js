import Faculty from '../models/faculty.model.js';
import { BaseRepository } from './base.repository.js';

/*

 * FacultyRepository - Repository para operaciones con facultades
 * Extiende BaseRepository para reutilizar lógica CRUD genérica

*/
export class FacultyRepository extends BaseRepository {
  constructor() {
    super(Faculty);
  }

  /*
    Crea una nueva facultad
  */
  async createFaculty(facultyData) {
    try {
      const { name, description } = facultyData;

      if (!name) {
        throw new Error('Faculty name is required');
      }

      const cleanData = {
        name: name.trim(),
        description: description ? description.trim() : undefined,
      };

      return await this.create(cleanData);
    } catch (error) {
      throw new Error(`Error creating faculty: ${error.message}`);
    }
  }

  /*
    Obtiene facultad por ID
  */
  async getFacultyById(facultyId) {
    return this.findById(facultyId);
  }

  /*
    Obtiene facultad por nombre
  */
  async getFacultyByName(name) {
    return this.findOne({ name: name.trim() });
  }

  /*
    Obtiene todas las facultades
  */
  async getAllFaculties() {
    return this.findAll({ sort: { createdAt: -1 } });
  }

  /*
    Actualiza facultad
  */
  async updateFaculty(facultyId, updateData) {
    const cleanData = {};
    if (updateData.name) cleanData.name = updateData.name.trim();
    if (updateData.description) cleanData.description = updateData.description.trim();

    if (Object.keys(cleanData).length === 0) {
      throw new Error('No valid fields to update');
    }

    return this.update(facultyId, cleanData);
  }

  /*
    Elimina facultad
  */
  async deleteFaculty(facultyId) {
    return this.delete(facultyId);
  }

  /*
    Verifica si nombre existe
  */
  async facultyNameExists(name) {
    return this.exists({ name: name.trim() });
  }

  /*
    Obtiene total de facultades
  */
  async getFacultyCount() {
    return this.count();
  }
}

// Exportar funciones para compatibilidad con código existente
export const createFaculty = async (facultyData) => {
  const repo = new FacultyRepository();
  return repo.createFaculty(facultyData);
};

export const getFacultyById = async (facultyId) => {
  const repo = new FacultyRepository();
  return repo.getFacultyById(facultyId);
};

export const getFacultyByName = async (name) => {
  const repo = new FacultyRepository();
  return repo.getFacultyByName(name);
};

export const getAllFaculties = async () => {
  const repo = new FacultyRepository();
  return repo.getAllFaculties();
};

export const updateFaculty = async (facultyId, updateData) => {
  const repo = new FacultyRepository();
  return repo.updateFaculty(facultyId, updateData);
};

export const deleteFaculty = async (facultyId) => {
  const repo = new FacultyRepository();
  return repo.deleteFaculty(facultyId);
};

export const facultyNameExists = async (name) => {
  const repo = new FacultyRepository();
  return repo.facultyNameExists(name);
};

export const getFacultyCount = async () => {
  const repo = new FacultyRepository();
  return repo.getFacultyCount();
};

// Exportar clase y singleton
export default new FacultyRepository();
