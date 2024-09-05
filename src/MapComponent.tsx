// src/MapComponent.tsx
import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: 52.52,  // Latitude for Berlin, you can change this
    lng: 13.4050,  // Longitude for Berlin, you can change this
};

const MapComponent: React.FC = () => {
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch the API key from the JSON server
        const fetchApiKey = async () => {
            try {
                const response = await fetch('http://localhost:5001/config');
                const data = await response.json();
                setApiKey(data.googleMapsApiKey); // Set the fetched API key in state
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch API key.');
                setLoading(false);
            }
        };

        fetchApiKey();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        apiKey ? (
            <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                >
                    {/* Child components, such as markers, info windows, etc. */}
                </GoogleMap>
            </LoadScript>
        ) : (
            <div>API Key not found.</div>
        )
    );
};

export default MapComponent;
