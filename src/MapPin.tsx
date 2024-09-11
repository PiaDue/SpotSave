import { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import './App.css';

type LatLngLiteral = google.maps.LatLngLiteral;

interface MapPinProps {
    position: LatLngLiteral;
    color?: string;
    size?: number;
}

const MapPin: React.FC<MapPinProps> = ({ position, color = 'green', size = 30 }) => {
    const [infoWindowShown, setInfoWindowShown] = useState(false);

    return (
        <>
            <Marker
                position={position}
                onClick={() => setInfoWindowShown(!infoWindowShown)}
                icon={{
                    url: '/public/' + color + '-pin.svg',
                    scaledSize: new window.google.maps.Size(size, size),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(size / 2, size),
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