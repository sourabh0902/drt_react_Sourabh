'use client';

import { Satellite, Loader2, AlertCircle } from 'lucide-react';
import { SearchInput } from '@/components/SearchInput';
import { FilterPanel } from '@/components/FilterPanel';
import { VirtualizedTable } from '@/components/VirtualizedTable';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSatellites } from '@/hooks/useSatellites';

export default function Home() {
  const {
    data,
    loading,
    error,
    filters,
    sortConfig,
    handleSearch,
    handleFiltersChange,
    handleSort,
    refetch
  } = useSatellites();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-start justify-between flex-col gap-2">
            <div className="flex items-center gap-3">
              <Satellite className="h-8 w-8 text-blue-400" />
              <h1 className="text-2xl font-bold text-white">Satellite Data Explorer</h1>
            </div>
            <p className="text-slate-400 mt-1">Search and filter satellite data from around the world</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <SearchInput
                onSearch={handleSearch}
                placeholder="Search by Name/ NORAD ID"
              />
              <FilterPanel
                selectedObjectTypes={filters.objectTypes}
                selectedOrbitCodes={filters.orbitCodes}
                onFiltersChange={handleFiltersChange}
              />
            </div>

            {/* Results Summary */}
            {data.length > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-gray-400">
                    {data.length.toLocaleString()} objects
                  </span>
                </div>
                {error && (
                  <Button variant="outline" onClick={refetch} size="sm">
                    Retry
                  </Button>
                )}
              </div>
            )}

            {/* Error State */}
            {error && (
              <Alert className="border-red-800 bg-red-900/20">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-red-200">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center p-12">
                <div className="flex items-center gap-3">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
                  <span className="text-gray-400">Loading satellite data...</span>
                </div>
              </div>
            )}

            {/* Data Table */}
            {!loading && !error && data.length > 0 && (
              <VirtualizedTable
                data={data}
                sortConfig={{
                  field: sortConfig.field || 'name',
                  direction: sortConfig.direction
                }}
                onSort={handleSort}
              />
            )}
          </div>

        </div>
      </div>
    </div>
  );
}