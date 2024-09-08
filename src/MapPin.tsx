import { useEffect, useState } from 'react';
import { AdvancedMarker, useAdvancedMarkerRef, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import './App.css';

interface MapPinProps {
    pin: any;
    index: number;
}

const MapPin: React.FC<MapPinProps> = ({ pin, index }) => {
    const [markerRef, marker] = useAdvancedMarkerRef();
    const [infoWindowShown, setInfoWindowShown] = useState(false);


    return (
        <>
            <AdvancedMarker
                key={index}
                ref={markerRef}
                position={pin}
                onClick={() => setInfoWindowShown(!infoWindowShown)}
            >
                <Pin background={'orange'} borderColor={'red'} glyphColor={'red'} />
            </AdvancedMarker>
            {infoWindowShown && (
                <InfoWindow anchor={marker} onCloseClick={() => setInfoWindowShown(false)}>
                    <p>Info</p>
                </InfoWindow>
            )}
        </>
    );
};
export default MapPin;