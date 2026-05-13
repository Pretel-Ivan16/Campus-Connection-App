import { useState, useEffect } from 'react';
import { facultyService, type Faculty } from '../services/faculty.service';

interface UseFacultiesReturn {
  faculties: Faculty[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * useFaculties - Hook para obtener todas las facultades
 */
export const useFaculties = (): UseFacultiesReturn => {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await facultyService.getAllFaculties();
      setFaculties(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error fetching faculties');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return { faculties, isLoading, error, refetch };
};

interface UseFacultyReturn {
  faculty: Faculty | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * useFaculty - Hook para obtener una facultad por ID
 */
export const useFaculty = (id: string): UseFacultyReturn => {
  const [faculty, setFaculty] = useState<Faculty | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await facultyService.getFacultyById(id);
        setFaculty(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error fetching faculty');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchFaculty();
    }
  }, [id]);

  return { faculty, isLoading, error };
};
