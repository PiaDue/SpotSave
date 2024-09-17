import { createContext, useContext, ReactNode, useState, useCallback } from 'react';
type LatLngLiteral = google.maps.LatLngLiteral;

interface Pin {
    id?: string;
    position: LatLngLiteral;
    placeID: string;
}

interface PinContextType {
    pins: Pin[];
    fetchPins: () => Promise<void>;
    addPin: (pin: Pin) => Promise<void>;
    removePin: (pinToDelete: Pin) => Promise<void>;
    isPinned: (placeID: string) => boolean;
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

    const addPin = useCallback(async (pin: Pin) => {
        try {
            const response = await fetch('http://localhost:5001/pins', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pin)
            });
            const data = await response.json();
            setPins(prevPins => [...prevPins, data]);
        }
        catch (error) {
            console.error('Failed to add Pin.');
        };
    }, []);

    const removePin = useCallback(async (pinToDelete: Pin) => {
        try {
            if (pinToDelete?.id) {
                const deleteResponse = await fetch(`http://localhost:5001/pins/${pinToDelete.id}`, {
                    method: 'DELETE',
                });

                if (deleteResponse.ok) {
                    console.log(`Pin with placeID ${pinToDelete.placeID} has been deleted.`);
                } else {
                    console.error(`Failed to delete pin with placeID ${pinToDelete.placeID}.`);
                }

                setPins(prevPins => prevPins.filter(pin => pin.placeID !== pinToDelete.placeID));
            }
        } catch (error) {
            console.error('Failed to remove Pin.', error);
        };
    }, []);

    const isPinned = (placeID: string) => {
        return pins.some(pin => pin.placeID === placeID);
    }

    return (
        <PinContext.Provider value={{
            pins,
            fetchPins,
            addPin,
            removePin,
            isPinned
        }}>
            {children}
        </PinContext.Provider>
    );

}