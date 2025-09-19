import { createContext } from 'react';
import type { GeoLocationData } from '@/types/types';

interface GeoContextType {
    geoData: GeoLocationData | null;
    geoLoading: boolean;
    geoError: string | null;
}

const GeoContext = createContext<GeoContextType | null>(null);

export default GeoContext;
