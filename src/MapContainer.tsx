import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import Map from './Map';

interface MapContainerProps {
    apiKey: string;
    mapID: string;
}

const MapContainer: React.FC<MapContainerProps> = ({ apiKey, mapID }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries: ["places"],
    });

    if (!isLoaded) return <div>Loading...</div>;

    return <Map mapID={mapID} />;
};

export default MapContainer;
