import { useContext } from 'react';
import GeoContext from '@/contexts/geo-context';

export const useGeo = () => {
    const context = useContext(GeoContext);
    if (!context) {
        throw new Error('useGeo must be used within a GeoProvider');
    }
    return context;
};
