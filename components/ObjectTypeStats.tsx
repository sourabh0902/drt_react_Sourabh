'use client';

// import { Badge } from '@/components/ui/badge';

interface ObjectTypeStatsProps {
    counts: {
        total: string;
        PAYLOAD: string;
        'ROCKET BODY': string;
        UNKNOWN: string;
        DEBRIS: string;
    } | null;
    selectedObjectTypes: string[];
    onTypeFilter?: (type: string) => void | null;
}

export function ObjectTypeStats({ counts, selectedObjectTypes, onTypeFilter }: ObjectTypeStatsProps) {
    if (!counts) return null;

    const types = [
        { key: 'all', label: 'All Objects', count: counts.total, color: 'bg-gray-600' },
        { key: 'PAYLOAD', label: 'Payloads', count: counts.PAYLOAD, color: 'bg-blue-600' },
        { key: 'DEBRIS', label: 'Debris', count: counts.DEBRIS, color: 'bg-red-600' },
        { key: 'ROCKET BODY', label: 'Rocket Bodies', count: counts['ROCKET BODY'], color: 'bg-orange-600' },
        { key: 'UNKNOWN', label: 'Unknown', count: counts.UNKNOWN, color: 'bg-gray-500' }
    ];

    return (
        <div className="flex flex-wrap gap-2">
            {types.map((type) => {
                const isSelected = type.key === 'all'
                    ? selectedObjectTypes.length === 0
                    : selectedObjectTypes.includes(type.key);

                return (
                    <button
                        key={type.key}
                        // onClick={() => onTypeFilter(type.key)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${isSelected
                            ? 'border-blue-500 bg-blue-900/30'
                            : 'border-gray-600 bg-gray-800 hover:bg-gray-700'
                            }`}
                    >
                        <div className={`w-3 h-3 rounded-full ${type.color}`} />
                        <span className="text-white text-sm font-medium">{type.label}</span>
                        {/* <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                            {parseInt(type.count).toLocaleString()}
                        </Badge> */}
                    </button>
                );
            })}
        </div>
    );
}