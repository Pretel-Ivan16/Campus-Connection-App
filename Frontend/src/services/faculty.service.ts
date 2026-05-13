import apiClient from '../utils/apiClient';

export type Faculty = {
  _id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateFacultyRequest = {
  name: string;
  description?: string;
};

export type UpdateFacultyRequest = {
  name?: string;
  description?: string;
};

export const facultyService = {
  // Obtener todas las facultades
  getAllFaculties: async (): Promise<Faculty[]> => {
    const response = await apiClient.get('/faculties');
    return response.data.data || [];
  },

  // Obtener facultad por ID
  getFacultyById: async (id: string): Promise<Faculty> => {
    const response = await apiClient.get(`/faculties/${id}`);
    return response.data.data;
  },

  // Crear facultad (solo admins)
  createFaculty: async (data: CreateFacultyRequest): Promise<Faculty> => {
    const response = await apiClient.post('/faculties', data);
    return response.data.data;
  },

  // Actualizar facultad (solo admins)
  updateFaculty: async (id: string, data: UpdateFacultyRequest): Promise<Faculty> => {
    const response = await apiClient.put(`/faculties/${id}`, data);
    return response.data.data;
  },

  // Eliminar facultad (solo admins)
  deleteFaculty: async (id: string): Promise<void> => {
    await apiClient.delete(`/faculties/${id}`);
  },

  // Obtener total de facultades
  getFacultyCount: async (): Promise<number> => {
    const response = await apiClient.get('/faculties/count/total');
    return response.data.data.count;
  },
};
