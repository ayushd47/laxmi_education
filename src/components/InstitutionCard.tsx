interface Institution {
  id: string;
  name: string;
  location: string;
  type: string;
  description: string;
  website?: string;
  established?: string;
  ranking?: string;
  programs?: string[];
  image?: string;
}

interface InstitutionCardProps {
  institution: Institution;
}

export default function InstitutionCard({ institution }: InstitutionCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
              {institution.name}
            </h3>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <span className="mr-2">📍</span>
              <span>{institution.location}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <span className="mr-2">🏛️</span>
              <span>{institution.type}</span>
            </div>
          </div>
          {institution.ranking && (
            <div className="bg-royal-blue text-white px-3 py-1 rounded-full text-sm font-semibold">
              #{institution.ranking}
            </div>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {institution.description}
        </p>

        {institution.programs && institution.programs.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Popular Programs:</h4>
            <div className="flex flex-wrap gap-1">
              {institution.programs.slice(0, 3).map((program, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                >
                  {program}
                </span>
              ))}
              {institution.programs.length > 3 && (
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                  +{institution.programs.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {institution.established && (
              <span>Est. {institution.established}</span>
            )}
          </div>
          {institution.website && (
            <a
              href={institution.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-royal-blue hover:text-deep-red text-sm font-medium transition-colors"
            >
              Visit Website →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

