import { useEffect, useState, useRef } from 'react';
import { usePins } from './contexts/PinContext';

type PlacesService = google.maps.places.PlacesService;
type PlaceResult = google.maps.places.PlaceResult;
type LatLngLiteral = google.maps.LatLngLiteral;

interface SpotDetailsProps {
    service: PlacesService;
    position: LatLngLiteral;
    placeID: string;
    handleClose: () => void;
}

/* TODO:
        - hide/show opening hours
        - display rating with graphics
        - show photos
*/

const SpotDetails: React.FC<SpotDetailsProps> = ({ service, position, placeID, handleClose }) => {
    const { addPin } = usePins();
    const [placeDetails, setPlaceDetails] = useState<PlaceResult | null>(null);

    const request = {
        placeId: placeID,
        fields: ['name', 'formatted_address', 'geometry', 'rating', 'website', 'opening_hours', 'photos']
    }

    useEffect(() => {
        service.getDetails(request, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                setPlaceDetails(place);
                console.log(place);
            } else {
                console.error('Place details request failed due to: ' + status);
            }
        });
    }, [placeID]);

    const handleSave = async () => {
        const newPin = {
            position: position,
            placeID: placeID,
            name: placeDetails?.name
        };
        console.log('New Pin:', newPin);
        await addPin(newPin);
    };


    return (
        <div className="place-details-container">
            {placeDetails && (
                <div>
                    <div className='d-flex justify-content-end'>
                        <button type="button" onClick={handleSave} className="btn " aria-label="Save">
                            <i className="bi bi-pin-angle"></i>
                        </button>
                        <button type="button" onClick={handleClose} className="btn" aria-label="Close">
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>
                    <h3>{placeDetails.name}</h3>
                    <p>{placeDetails.formatted_address}</p>
                    {placeDetails.website && <a href={placeDetails.website}>{placeDetails.website}</a>}
                    {placeDetails.rating && <p>Rating: {placeDetails.rating}/5</p>}
                    {placeDetails.opening_hours && (
                        <div>
                            <strong>Opening Hours:</strong>
                            {placeDetails.opening_hours.weekday_text?.map((day, index) => (
                                <li key={index}>{day}</li>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
export default SpotDetails;