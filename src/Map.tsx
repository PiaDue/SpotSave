import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { GoogleMap } from "@react-google-maps/api";
import MapPin from './MapPin';
import Search from './Search';
import './App.css';

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

interface MapProps {
    mapID: string;
}

const Map: React.FC<MapProps> = ({ mapID }) => {
    const [pins, setPins] = useState<any[]>([]);
    const [spot, setSpot] = useState<LatLngLiteral | null>(null);
    const [error, setError] = useState<string | null>(null);
    const mapRef = useRef<GoogleMap>();
    const berlinLatLng = useMemo<LatLngLiteral>(() => ({ lat: 52.52, lng: 13.4050, }), []);
    const mapOptions = useMemo<MapOptions>(() => ({ mapId: mapID }), []);
    const onLoad = useCallback((map) => (mapRef.current = map as unknown as GoogleMap), []);

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
        <>
            <Search setSpot={(position: LatLngLiteral) => {
                //console.log('Selected position:', position); // Uncomment to see the selected position in the console
                setSpot(position);
                mapRef.current?.panTo(position);
            }} />
            <GoogleMap
                zoom={10}
                center={berlinLatLng}
                mapContainerClassName="map-container"
                options={mapOptions}
                onLoad={onLoad}
            >
                {pins.map((pin, index) => (
                    <MapPin key={index} pin={pin} index={index} />
                ))}
            </GoogleMap>
        </>
    );
};

export default Map;
