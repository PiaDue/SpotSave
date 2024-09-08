import { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Map from './Map';
import './App.css';

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
