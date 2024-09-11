import { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import './App.css';
type LatLngLiteral = google.maps.LatLngLiteral;

interface MapPinProps {
    position: LatLngLiteral;
    index: number;
}

const MapPin: React.FC<MapPinProps> = ({ position, index }) => {
    const [infoWindowShown, setInfoWindowShown] = useState(false);

    return (
        <>
            <Marker
                key={index}
                position={position}
                onClick={() => setInfoWindowShown(!infoWindowShown)}
                icon={{
                    url: '/public/green-pin.svg',
                    scaledSize: new window.google.maps.Size(30, 30),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(15, 0),
                }}
            />
            {infoWindowShown && (
                <InfoWindow position={position} onCloseClick={() => setInfoWindowShown(false)}>
                    <p>Info</p>
                </InfoWindow>
            )}
        </>
    );
};
export default MapPin;