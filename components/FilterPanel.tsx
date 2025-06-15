'use client';

import { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { OBJECT_TYPES, ORBIT_CODES } from '@/types/satelliteProps';

interface FilterPanelProps {
  selectedObjectTypes: string[];
  selectedOrbitCodes: string[];
  onFiltersChange: (objectTypes: string[], orbitCodes: string[]) => void;
}

export function FilterPanel({
  selectedObjectTypes,
  selectedOrbitCodes,
  onFiltersChange,
}: FilterPanelProps) {
  const [tempObjectTypes, setTempObjectTypes] = useState<string[]>(selectedObjectTypes);
  const [tempOrbitCodes, setTempOrbitCodes] = useState<string[]>(selectedOrbitCodes);

  const handleObjectTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setTempObjectTypes(prev => [...prev, type]);
    } else {
      setTempObjectTypes(prev => prev.filter(t => t !== type));
    }
  };

  const handleOrbitCodeChange = (code: string, checked: boolean) => {
    if (checked) {
      setTempOrbitCodes(prev => [...prev, code]);
    } else {
      setTempOrbitCodes(prev => prev.filter(c => c !== code));
    }
  };

  const applyFilters = () => {
    onFiltersChange(tempObjectTypes, tempOrbitCodes);
  };

  const resetFilters = () => {
    setTempObjectTypes([]);
    setTempOrbitCodes([]);
    onFiltersChange([], []);
  };

  const activeFilterCount = selectedObjectTypes.length + selectedOrbitCodes.length;

  return (
    <div className="flex gap-4 max-w-[400px] flex-wrap md:max-w-full">
      {/* Object Types Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700 hover:text-white cursor-pointer"
          >
            Object Type
            {selectedObjectTypes.length > 0 && (
              <Badge variant="secondary" className="ml-2 bg-blue-600 text-white">
                {selectedObjectTypes.length}
              </Badge>
            )}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-gray-800 border-gray-600">
          <div className="space-y-4">
            <h4 className="font-medium text-white">Select Object Types</h4>
            <div className="space-y-3">
              {OBJECT_TYPES.map(type => (
                <div key={type} className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`object-${type}`}
                      checked={tempObjectTypes.includes(type)}
                      onCheckedChange={(checked) => handleObjectTypeChange(type, checked as boolean)}
                      className='data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700'
                    />
                    <Label htmlFor={`object-${type}`} className="text-white">
                      {type}
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Orbit Codes Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700 hover:text-white cursor-pointer"
          >
            Orbit Code
            {selectedOrbitCodes.length > 0 && (
              <Badge variant="secondary" className="ml-2 bg-blue-600 text-white">
                {selectedOrbitCodes.length}
              </Badge>
            )}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-gray-800 border-gray-600">
          <div className="space-y-4">
            <h4 className="font-medium text-white">Select Orbit Codes</h4>
            <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto custom-scrollbar">
              {ORBIT_CODES.map(code => (
                <div key={code} className="flex items-center space-x-2">
                  <Checkbox
                    id={`orbit-${code}`}
                    checked={tempOrbitCodes.includes(code)}
                    onCheckedChange={(checked) => handleOrbitCodeChange(code, checked as boolean)}
                    className='data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700'
                  />
                  <Label htmlFor={`orbit-${code}`} className="text-white text-sm">
                    {code}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Apply/Reset Buttons */}
      <div className="flex gap-2">
        <Button
          onClick={applyFilters}
          className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
        >
          <Filter className="mr-2 h-4 w-4" />
          Apply Filters
        </Button>
        {activeFilterCount > 0 && (
          <Button
            variant="destructive"
            onClick={resetFilters}
          className="cursor-pointer"
          >
            Reset
          </Button>
        )}
      </div>
    </div>
  );
}