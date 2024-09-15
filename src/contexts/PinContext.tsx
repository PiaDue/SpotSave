import { createContext, useContext, ReactNode, useState, useCallback } from 'react';
type LatLngLiteral = google.maps.LatLngLiteral;

interface Pin {
    position: LatLngLiteral;
    placeID: string;
}

interface PinContextType {
    pins: Pin[];
    fetchPins: () => Promise<void>;
}

const PinContext = createContext<PinContextType | undefined>(undefined);
export const usePins = () => {
    const context = useContext(PinContext);
    if (context === undefined) {
        throw new Error('useGoals must be used within a GoalsProvider');
    }
    return context;
};

export const PinProvider = ({ children }: { children: ReactNode }) => {
    const [pins, setPins] = useState<Pin[]>([]);

    const fetchPins = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:5001/pins');
            const data = await response.json();
            setPins(data);
        }
        catch (error) {
            console.error('Failed to fetch Pin Data.');
        };
    }, []);

    return (
        <PinContext.Provider value={{
            pins,
            fetchPins
        }}>
            {children}
        </PinContext.Provider>
    );

}