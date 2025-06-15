import { SatelliteResponse, SearchFilters } from '@/types/satelliteProps';

const API_BASE_URL = 'https://backend.digantara.dev/v1';

export async function fetchSatellites(filters: SearchFilters): Promise<SatelliteResponse> {
    const params = new URLSearchParams();

    // Add object types
    if (filters.objectTypes.length > 0) {
        params.append('objectTypes', filters.objectTypes.join(','));
    }

    // Add attributes
    params.append('attributes', 'noradCatId,intlDes,name,launchDate,decayDate,objectType,launchSiteCode,countryCode,orbitCode');

    const url = `${API_BASE_URL}/satellites?${params.toString()}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch satellites');
        }

        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Network error occurred');
    }
}