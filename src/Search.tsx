import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";

interface SearchProps {
    setSpot: (postition: google.maps.LatLngLiteral, placeID: string) => void;
}

const Search: React.FC<SearchProps> = ({ setSpot }) => {
    const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete();
    //console.log({ status, data }); // Uncomment to see the data structure in the console

    const handleSelect = async (val: string) => {
        setValue(val, false);
        clearSuggestions();
        const result = await getGeocode({ address: val });
        const placeID = result[0].place_id;
        const { lat, lng } = getLatLng(result[0]);
        setSpot({ lat, lng }, placeID);
    };

    return (
        <Combobox onSelect={handleSelect} className="combobox">
            <ComboboxInput
                className="combobox-input"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                disabled={!ready}
                placeholder="Search"
            />
            <ComboboxPopover>
                <ComboboxList className="combobox-list">
                    {status === "OK" &&
                        data.map(({ place_id, description }) => (
                            <ComboboxOption key={place_id} value={description} className="combobox-option" />
                        ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    );
};

export default Search;