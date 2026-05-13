import { RoleGuard } from '../common/RoleGuard';

export const FacultyListEmpty = () => {
  return (
    <div className="text-center py-20">
      <p className="text-[#8f8f8f] text-lg mb-4">No hay facultades disponibles</p>
      <RoleGuard allowedRoles={['admin']}>
        <p className="text-[#8f8f8f] text-sm">
          Como administrador, puedes crear la primera facultad usando el botón arriba.
        </p>
      </RoleGuard>
    </div>
  );
};
