import User from '../models/user.model.js';
import { BaseRepository } from './base.repository.js';

/*

  UserRepository - Repository para operaciones con usuarios
  Extiende BaseRepository para reutilizar lógica CRUD genérica

*/

export class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  /*
    Crea un nuevo usuario con normalizaciones
  */
  async createUser(userData) {
    try {
      const { email, password, isVerified = false, verificationToken } = userData;

      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      const cleanData = {
        email: email.toLowerCase().trim(),
        password,
        isVerified,
        verificationToken,
      };

      return await this.create(cleanData);
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  /*
    Obtiene usuario por ID (sin password ni token)
  */
  async getUserById(userId) {
    return this.findById(userId, { select: '-password -verificationToken' });
  }

  /*
    Obtiene usuario por email
  */
  async getUserByEmail(email, includePassword = false) {
    const query = { email: email.toLowerCase().trim() };
    const select = includePassword ? '' : '-password -verificationToken';
    return this.findOne(query, { select });
  }

  /*
    Obtiene usuario con password (solo para login)
  */
  async getUserWithPassword(email) {
    const query = { email: email.toLowerCase().trim() };
    return this.findOne(query, { select: '+password' });
  }

  /*
    Obtiene todos los usuarios
  */
  async getAllUsers() {
    return this.findAll({
      select: '-password -verificationToken',
      sort: { createdAt: -1 },
    });
  }

  /*
    Actualiza usuario (solo isVerified y token)
  */
  async updateUser(userId, updateData) {
    const allowedFields = ['isVerified', 'verificationToken'];
    const cleanData = {};

    for (const field of allowedFields) {
      if (field in updateData) {
        cleanData[field] = updateData[field];
      }
    }

    if (Object.keys(cleanData).length === 0) {
      throw new Error('No valid fields to update');
    }

    return this.update(userId, cleanData, {
      select: '-password -verificationToken',
    });
  }

  /*
    Elimina usuario
  */
  async deleteUser(userId) {
    return this.delete(userId);
  }

  /*
    Verifica si email existe
  */
  async emailExists(email) {
    return this.exists({ email: email.toLowerCase().trim() });
  }
}

// Exportar instancia singleton para compatibilidad con código existente
export const createUser = async (userData) => {
  const repo = new UserRepository();
  return repo.createUser(userData);
};

export const getUserById = async (userId) => {
  const repo = new UserRepository();
  return repo.getUserById(userId);
};

export const getUserByEmail = async (email, includePassword = false) => {
  const repo = new UserRepository();
  return repo.getUserByEmail(email, includePassword);
};

export const getUserWithPassword = async (email) => {
  const repo = new UserRepository();
  return repo.getUserWithPassword(email);
};

export const getAllUsers = async () => {
  const repo = new UserRepository();
  return repo.getAllUsers();
};

export const updateUser = async (userId, updateData) => {
  const repo = new UserRepository();
  return repo.updateUser(userId, updateData);
};

export const deleteUser = async (userId) => {
  const repo = new UserRepository();
  return repo.deleteUser(userId);
};

export const emailExists = async (email) => {
  const repo = new UserRepository();
  return repo.emailExists(email);
};

// Exportar clase y singleton
export default new UserRepository();
