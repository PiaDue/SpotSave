// src/MapComponent.tsx
import { useEffect, useState } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import MapPin from './MapPin';
import './App.css';

const berlin = {
    lat: 52.52,
    lng: 13.4050,
};

const MapComponent: React.FC = () => {
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [mapID, setMapID] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [pins, setPins] = useState<any[]>([]);


    useEffect(() => {
        fetchMapConfig();
        fetchPins();
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

    const fetchPins = async () => {
        try {
            const response = await fetch('http://localhost:5001/pins');
            const data = await response.json();
            setPins(data);
        }
        catch (error) {
            setError('Failed to fetch Pin Data.');
        };
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
                        {pins.map((pin, index) => (
                            <MapPin
                                key={index}
                                pin={pin}
                                index={index}
                            />
                        ))}
                    </Map>
                </div>
            </APIProvider>
        ) : (
            <div>API Key not found.</div>
        )
    );
};

export default MapComponent;
