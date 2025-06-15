'use client';

import { useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SatelliteData, SortField, SortDirection } from '@/types/satelliteProps';

interface VirtualizedTableProps {
    data: SatelliteData[];
    onToggleSelection?: (item: SatelliteData) => void;
    onSelectAll?: (items: SatelliteData[]) => void;
    onClearAll?: () => void;
    isSelected?: (noradCatId: string) => boolean;
    sortConfig: { field: SortField; direction: SortDirection };
    onSort: (field: SortField) => void;
}

interface RowProps {
    index: number;
    style: React.CSSProperties;
    data: {
        items: SatelliteData[];
        onToggleSelection?: (item: SatelliteData) => void;
        isSelected?: (noradCatId: string) => boolean;
    };
}

const TableRow = ({ index, style, data }: RowProps) => {
    const item = data.items[index];

    const getObjectTypeColor = (type: string) => {
        switch (type) {
            case 'PAYLOAD': return 'text-blue-400';
            case 'ROCKET BODY': return 'text-orange-400';
            case 'DEBRIS': return 'text-red-400';
            case 'UNKNOWN': return 'text-gray-400';
            default: return 'text-white';
        }
    };

    const formatOrbitCode = (orbitCode: string) => {
        return orbitCode.replace(/[{}]/g, '').replace(/,/g, ', ');
    };

    return (
        <div
            style={style}
            className={`flex items-center px-4 border-b border-gray-700 hover:bg-gray-800 transition-colors}`}
        >
            <div className="w-24 text-sm font-mono text-gray-300">{item.noradCatId}</div>
            <div className="flex-1 text-sm text-white font-medium truncate pr-4">{item.name}</div>
            <div className="w-32 text-sm text-gray-300">{formatOrbitCode(item.orbitCode)}</div>
            <div className={`w-32 text-sm font-medium ${getObjectTypeColor(item.objectType)}`}>
                {item.objectType}
            </div>
            <div className="w-20 text-sm text-gray-300">{item.countryCode}</div>
            <div className="w-24 text-sm text-gray-300">{item.launchDate}</div>
        </div>
    );
};

export function VirtualizedTable({
    data,
    onToggleSelection,
    isSelected,
    sortConfig,
    onSort
}: VirtualizedTableProps) {

    const getSortIcon = (field: SortField) => {
        if (sortConfig.field !== field) {
            return '';
        }
        return sortConfig.direction === 'asc'
            ? <ArrowUp className="ml-1 h-3 w-3" />
            : <ArrowDown className="ml-1 h-3 w-3" />;
    };

    const rowData = useMemo(() => ({
        items: data,
        onToggleSelection,
        isSelected
    }), [data, onToggleSelection, isSelected]);

    return (
        <div className="w-full overflow-x-auto">
            <div className="min-w-[750px]">
                <div className="border border-gray-700 rounded-lg bg-gray-900 overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center px-4 py-3 bg-gray-800 border-b border-gray-700">
                        <div className="w-24 text-sm font-medium text-gray-300">
                            <Button
                                variant="link"
                                size="sm"
                                onClick={() => onSort('noradCatId')}
                                className="h-auto p-0 gap-0 font-medium text-gray-300 hover:text-white cursor-pointer"
                            >
                                NORAD ID
                                {getSortIcon('noradCatId')}
                            </Button>
                        </div>
                        <div className="max-w-[660px] flex-1 text-sm font-medium text-gray-300 pr-0">
                            <Button
                                variant="link"
                                size="sm"
                                onClick={() => onSort('name')}
                                className="h-auto p-0 gap-0 font-medium text-gray-300 hover:text-white cursor-pointer"
                            >
                                Name
                                {getSortIcon('name')}
                            </Button>
                        </div>
                        <div className="w-31 text-sm font-medium text-gray-300">Orbit Code</div>
                        <div className="w-32 text-sm font-medium text-gray-300">Object Type</div>
                        <div className="w-22 text-sm font-medium text-gray-300">
                            <Button
                                variant="link"
                                size="sm"
                                onClick={() => onSort('countryCode')}
                                className="h-auto p-0 gap-0 font-medium text-gray-300 hover:text-white cursor-pointer"
                            >
                                Country
                                {getSortIcon('countryCode')}
                            </Button>
                        </div>
                        <div className="w-26 text-sm font-medium text-gray-300">
                            <Button
                                variant="link"
                                size="sm"
                                onClick={() => onSort('launchDate')}
                                className="h-auto p-0 gap-0 font-medium text-gray-300 hover:text-white cursor-pointer"
                            >
                                Launch Date
                                {getSortIcon('launchDate')}
                            </Button>
                        </div>
                    </div>

                    {/* Table Body */}
                    <div className="relative">
                        {data.length === 0 ? (
                            <div className="p-8 text-center text-gray-400">
                                No satellites found matching your criteria
                            </div>
                        ) : (
                            <List
                                width={'auto'}
                                height={600}
                                itemCount={data.length}
                                itemSize={56}
                                itemData={rowData}
                                className="custom-scrollbar"
                            >
                                {TableRow}
                            </List>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}