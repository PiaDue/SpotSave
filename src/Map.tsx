import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { GoogleMap, Marker } from "@react-google-maps/api";
import MapPin from './MapPin';
import Search from './Search';
import SpotDetails from './SpotDetails';
import './App.css';

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

interface MapProps {
    mapID: string;
}

interface Pin {
    position: LatLngLiteral;
    placeID: string;
}

/* TODO:  
        - click on pin: show details, highlight pin
        - save spots to local storage -> show pin on map
*/

const Map: React.FC<MapProps> = ({ mapID }) => {
    const [pins, setPins] = useState<Pin[]>([]);
    const [spot, setSpot] = useState<Pin | null>(null);
    const [error, setError] = useState<string | null>(null);
    const mapRef = useRef<GoogleMap>();

    const [placesService, setPlacesService] = useState<google.maps.places.PlacesService | null>(null);
    const onLoad = useCallback((map: GoogleMap) => {
        mapRef.current = map;
        const service = new google.maps.places.PlacesService(map as unknown as google.maps.Map);
        setPlacesService(service);
    }, []);

    const berlinLatLng = useMemo<LatLngLiteral>(() => ({ lat: 52.52, lng: 13.4050, }), []);
    const mapOptions = useMemo<MapOptions>(() => ({ mapId: mapID }), []);
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
            <Search setSpot={(position: LatLngLiteral, placeID: string) => {
                //console.log('Selected position:', position); // Uncomment to see the selected position in the console
                setSpot({ position, placeID });
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
                    <MapPin key={index} position={pin.position} />
                ))}

                {spot && (
                    <MapPin position={spot.position} color='red' size={40} />
                )}
                {spot && placesService && (
                    <SpotDetails service={placesService} placeID={spot.placeID} />
                )}

            </GoogleMap>
        </>
    );
};

export default Map;
