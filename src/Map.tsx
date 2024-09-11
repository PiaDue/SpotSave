import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { GoogleMap, Marker } from "@react-google-maps/api";
import MapPin from './MapPin';
import Search from './Search';
import './App.css';

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

interface MapProps {
    mapID: string;
}

/* TODO:  
        - show details of the selected location
        - show details for places on click
*/

const Map: React.FC<MapProps> = ({ mapID }) => {
    const [pins, setPins] = useState<any[]>([]);
    const [spot, setSpot] = useState<LatLngLiteral | null>(null);
    const [error, setError] = useState<string | null>(null);
    const mapRef = useRef<GoogleMap>();
    const berlinLatLng = useMemo<LatLngLiteral>(() => ({ lat: 52.52, lng: 13.4050, }), []);
    const mapOptions = useMemo<MapOptions>(() => ({ mapId: mapID }), []);
    const onLoad = useCallback((map) => (mapRef.current = map as unknown as GoogleMap), []);
    const placesService = new google.maps.places.PlacesService(mapRef.current! as unknown as google.maps.Map);

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
                {spot && <MapPin position={spot} color='red' size={40} />}
                {pins.map((pin, index) => (
                    <MapPin key={index} position={pin} />
                ))}

                {/*show a place details pop over at the right*/}
                {/* <div className="place-details">
                    <h2>Place Details</h2>
                    <p>Details</p>
                </div> */}

            </GoogleMap>
        </>
    );
};

export default Map;
