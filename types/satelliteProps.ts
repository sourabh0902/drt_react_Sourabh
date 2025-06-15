export interface SatelliteData {
    noradCatId: string;
    intlDes: string;
    name: string;
    launchDate: string;
    decayDate: string | null;
    objectType: 'PAYLOAD' | 'ROCKET BODY' | 'DEBRIS' | 'UNKNOWN';
    launchSiteCode: string;
    countryCode: string;
    orbitCode: string;
}

export interface SatelliteResponse {
    data: SatelliteData[];
    counts: {
        total: string;
        PAYLOAD: string;
        'ROCKET BODY': string;
        UNKNOWN: string;
        DEBRIS: string;
    };
}

export interface SatelliteError {
    statusCode: number;
    message: string;
}

export interface SearchFilters {
    search: string;
    objectTypes: string[];
    orbitCodes: string[];
}

export const OBJECT_TYPES = ['PAYLOAD', 'ROCKET BODY', 'DEBRIS', 'UNKNOWN'] as const;

export const ORBIT_CODES = [
    'LEO', 'LEO1', 'LEO2', 'LEO3', 'LEO4',
    'MEO', 'GEO', 'HEO', 'IGO', 'EGO',
    'NSO', 'GTO', 'GHO', 'HAO', 'MGO',
    'LMO', 'UFO', 'ESO', 'UNKNOWN'
] as const;

export type SortField = 'name' | 'noradCatId' | 'launchDate' | 'countryCode';
export type SortDirection = 'asc' | 'desc';