import { useEffect, useState, useRef } from 'react';

type PlacesService = google.maps.places.PlacesService;
type PlaceResult = google.maps.places.PlaceResult;

interface SpotDetailsProps {
    service: PlacesService;
    placeID: string;
}

/* TODO:
        - x butoon to close
        - hide/show opening hours
        - display rating with graphics
        - show photos
*/

const SpotDetails: React.FC<SpotDetailsProps> = ({ service, placeID }) => {
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

    return (
        <div className="place-details-container">
            {placeDetails && (
                <div>
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