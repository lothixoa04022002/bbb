import type { FC, ReactNode } from 'react';
import { useEffect, useState, useMemo } from 'react';
import type { GeoLocationData } from '@/types/types';
import axios from 'axios';
import GeoContext from '@/contexts/geo-context';

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    const [geoData, setGeoData] = useState<GeoLocationData | null>(null);
    const [geoLoading, setGeoLoading] = useState(true);
    const [geoError, setGeoError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGeoData = async () => {
            try {
                setGeoLoading(true);
                const response = await axios.get('https://get.geojs.io/v1/ip/geo.json');
                const data = response.data;
                setGeoData(data);
                localStorage.setItem('geolocationData', JSON.stringify(data));
                setGeoError(null);
            } catch (err) {
                setGeoError(err instanceof Error ? err.message : 'Unknown error occurred');
            } finally {
                setGeoLoading(false);
            }
        };

        fetchGeoData();
    }, []);

    const contextValue = useMemo(() => ({ geoData, geoLoading, geoError }), [geoData, geoLoading, geoError]);

    return <GeoContext.Provider value={contextValue}>{children}</GeoContext.Provider>;
};

export default Layout;
