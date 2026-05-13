import { useFaculty } from '../../hooks/useFaculties';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const FacultyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { faculty, isLoading, error } = useFaculty(id || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#8f8f8f]">Cargando facultad...</p>
        </div>
      </div>
    );
  }

  if (error || !faculty) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/facultades" className="flex items-center gap-2 text-[#6483ff] hover:text-[#5474e0] mb-6">
            <ArrowLeft size={20} />
            Volver a Facultades
          </Link>
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
            <p className="text-red-400">{error || 'Facultad no encontrada'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Botón volver */}
        <Link to="/facultades" className="flex items-center gap-2 text-[#6483ff] hover:text-[#5474e0] mb-8">
          <ArrowLeft size={20} />
          Volver a Facultades
        </Link>

        {/* Card de facultad */}
        <div className="bg-linear-to-br from-[#1a1d2e] to-[#0d0f16] border border-[#2a2a2a] rounded-lg p-8">
          <h1 className="text-4xl font-bold text-white mb-4">{faculty.name}</h1>

          {faculty.description && (
            <p className="text-[#b0b0b0] text-lg mb-6 leading-relaxed">
              {faculty.description}
            </p>
          )}

          {/* Información adicional */}
          <div className="border-t border-[#2a2a2a] pt-6 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[#8f8f8f] text-sm">Fecha de creación</p>
                <p className="text-white font-semibold">
                  {faculty.createdAt
                    ? new Date(faculty.createdAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-[#8f8f8f] text-sm">Última actualización</p>
                <p className="text-white font-semibold">
                  {faculty.updatedAt
                    ? new Date(faculty.updatedAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Sección de posts de esta facultad */}
          <div className="border-t border-[#2a2a2a] pt-6 mt-6">
            <h2 className="text-2xl font-bold text-white mb-4">Publicaciones</h2>
            <p className="text-[#8f8f8f]">Las publicaciones de esta facultad aparecerán aquí.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDetail;
