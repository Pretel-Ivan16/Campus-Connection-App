import type { Faculty } from '../../services/faculty.service';
import { FacultyMetadata } from './FacultyMetadata';
import { FacultyPosts } from './FacultyPosts';

interface FacultyInfoProps {
  faculty: Faculty;
}

export const FacultyInfo = ({ faculty }: FacultyInfoProps) => {
  return (
    <div className="bg-linear-to-br from-[#1a1d2e] to-[#0d0f16] border border-[#2a2a2a] rounded-lg p-8">
      {/* Información principal */}
      <h1 className="text-4xl font-bold text-white mb-4">{faculty.name}</h1>

      {faculty.description && (
        <p className="text-[#b0b0b0] text-lg mb-6 leading-relaxed">
          {faculty.description}
        </p>
      )}

      {/* Metadata */}
      <div className="border-t border-[#2a2a2a] pt-6 mt-6">
        <FacultyMetadata faculty={faculty} />
      </div>

      {/* Posts */}
      <div className="border-t border-[#2a2a2a] pt-6 mt-6">
        <FacultyPosts facultyId={faculty._id} />
      </div>
    </div>
  );
};
