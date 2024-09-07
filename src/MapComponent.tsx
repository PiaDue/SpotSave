// src/MapComponent.tsx
import { useEffect, useState } from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

import './App.css';

const containerStyle = {
    width: '100%',
    height: '400px',
};

const berlin = {
    lat: 52.52,
    lng: 13.4050,
};

const MapComponent: React.FC = () => {
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [mapID, setMapID] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        fetchMapConfig();
    }, []);

    const fetchMapConfig = async () => {
        try {
            const response = await fetch('http://localhost:5001/mapConfig');
            const data = await response.json();
            setApiKey(data.googleMapsApiKey);
            setMapID(data.mapID);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch MapConfig Data.');
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        apiKey ? (
            <APIProvider apiKey={apiKey}>
                <div className='map-container'>
                    <Map
                        defaultCenter={berlin}
                        defaultZoom={10}
                        mapId={mapID}
                    >
                    </Map>
                </div>
            </APIProvider>
        ) : (
            <div>API Key not found.</div>
        )
    );
};

export default MapComponent;
