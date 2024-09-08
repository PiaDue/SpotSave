import { useEffect, useState } from 'react';
import { GoogleMap } from "@react-google-maps/api";
import MapPin from './MapPin';
import './App.css';

const berlin = {
    lat: 52.52,
    lng: 13.4050,
};

interface MapProps {
    mapID: string;
}

const Map: React.FC<MapProps> = ({ mapID }) => {
    const [pins, setPins] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        fetchPins();
    }, []);


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

    if (error) return <div>{error}</div>;

    return (
        <GoogleMap
            zoom={10}
            center={berlin}
            mapContainerClassName="map-container"
        >
            {pins.map((pin, index) => (
                <MapPin key={index} pin={pin} index={index} />
            ))}
        </GoogleMap>
    );
};

export default Map;
