import { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import './App.css';

interface MapPinProps {
    pin: any;
    index: number;
}

const MapPin: React.FC<MapPinProps> = ({ pin, index }) => {
    const [infoWindowShown, setInfoWindowShown] = useState(false);

    return (
        <>
            <Marker
                key={index}
                position={pin}
                onClick={() => setInfoWindowShown(!infoWindowShown)}
            />
            {infoWindowShown && (
                <InfoWindow position={pin} onCloseClick={() => setInfoWindowShown(false)}>
                    <p>Info</p>
                </InfoWindow>
            )}
        </>
    );
};
export default MapPin;