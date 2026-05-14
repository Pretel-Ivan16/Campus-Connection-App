import { useFaculty } from '../../hooks/useFaculties';
import { useParams } from 'react-router-dom';
import { FacultyHeader } from '../../components/faculties/FacultyHeader';
import { FacultyInfo } from '../../components/faculties/FacultyInfo';
import { FacultyErrorState } from '../../components/faculties/FacultyErrorState';
import { FacultyLoadingState } from '../../components/faculties/FacultyLoadingState';

export const FacultyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { faculty, isLoading, error } = useFaculty(id || '');

  // Estados de carga y error
  if (isLoading) {
    return <FacultyLoadingState />;
  }

  if (error || !faculty) {
    return <FacultyErrorState error={error} />;
  }

  // Render principal
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header con botón volver */}
        <FacultyHeader />

        {/* Información principal (incluye metadata y posts) */}
        <FacultyInfo faculty={faculty} />
      </div>
    </div>
  );
};

export default FacultyDetail;
