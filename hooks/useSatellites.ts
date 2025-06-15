'use client';

import { useState, useEffect, useMemo } from 'react';
import { SatelliteData, SearchFilters, SortField, SortDirection } from '@/types/satelliteProps';
import { fetchSatellites } from '@/lib/api';

export function useSatellites() {
    const [data, setData] = useState<SatelliteData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [filters, setFilters] = useState<SearchFilters>({
        search: '',
        objectTypes: [],
        orbitCodes: []
    });

    const [sortConfig, setSortConfig] = useState<{
        field: SortField | null;
        direction: SortDirection;
    }>({
        field: null,
        direction: 'asc'
    });

    const fetchData = async (currentFilters: SearchFilters) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetchSatellites(currentFilters);
            setData(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(filters);
    }, [filters, filters.objectTypes, filters.orbitCodes]);

    const filteredAndSortedData = useMemo(() => {
        let filtered = [...data];

        // Apply search filter
        if (filters.search.trim()) {
            const searchTerm = filters.search.toLowerCase();
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(searchTerm) ||
                item.noradCatId.toLowerCase().includes(searchTerm)
            );
        }

        // Apply orbit code filter
        if (filters.orbitCodes.length > 0) {
            filtered = filtered.filter(item => {
                const orbitCodes = item.orbitCode.replace(/[{}]/g, '').split(',').map(code => code.trim());
                return filters.orbitCodes.some(filterCode => orbitCodes.includes(filterCode));
            });
        }

        // Apply sorting
        if (sortConfig.field) {
            filtered.sort((a, b) => {
                let aValue: string | number = a[sortConfig.field as SortField];
                let bValue: string | number = b[sortConfig.field as SortField];

                if (sortConfig.field === 'launchDate') {
                    aValue = new Date(aValue as string).getTime();
                    bValue = new Date(bValue as string).getTime();
                }

                if (typeof aValue === 'string') {
                    aValue = aValue.toLowerCase();
                    bValue = (bValue as string).toLowerCase();
                }

                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return filtered;
    }, [data, filters.search, filters.orbitCodes, sortConfig]);

    const handleSearch = (searchTerm: string) => {
        setFilters(prev => ({ ...prev, search: searchTerm }));
    };

    const handleFiltersChange = (newObjectTypes: string[], newOrbitCodes: string[]) => {
        setFilters(prev => ({
            ...prev,
            objectTypes: newObjectTypes,
            orbitCodes: newOrbitCodes
        }));
    };

    const handleSort = (field: SortField) => {
        setSortConfig(prev => ({
            field,
            direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    return {
        data: filteredAndSortedData,
        loading,
        error,
        filters,
        sortConfig,
        handleSearch,
        handleFiltersChange,
        handleSort,
        refetch: () => fetchData(filters)
    };
}