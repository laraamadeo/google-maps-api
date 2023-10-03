import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete"
import useOnclickOutside from "react-cool-onclickoutside"
import './PlacesAutocomplete.css'

export default function PlacesAutocomplete({ selectedItem, currentPos }) {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete()

    const handleInput = (e) => {
        setValue(e.target.value)
    }

    const handleSelect = async ({ description }) => {
        setValue(description)
        clearSuggestions()

        const results = await getGeocode({ address: description })
        const { lat, lng } = getLatLng(results[0])
        currentPos({ lat, lng })
        setValue("")
        selectedItem([description, lat, lng])
    }

    const ref = useOnclickOutside(() => {
        clearSuggestions()
    })

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const { place_id, structured_formatting: { main_text, secondary_text } } = suggestion

            return (
                <li className="list-row" key={place_id} onClick={() => handleSelect(suggestion)}>
                    <strong className="list-elem">{`${main_text}, `}</strong><small className="list-elem">{secondary_text}</small>
                </li>
            )
        })

    return (
        <div ref={ref} className="autocomplete-input-container">
            <label style={{ color: "#3b3b3f", textAlign: "start", width: "100%" }} htmlFor="autocomplete">Search</label>
            <input
                name="autocomplete"
                className="autocomplete-input"
                value={value}
                onChange={handleInput}
                disabled={!ready}
                placeholder="Where are you going?"
            />

            {status !== "OK" && value === undefined && value !== "" && <p style={{ textAlign: "left", backgroundColor: "lightpink", color: "#3b3b3f" }}>No results found.</p>}
            {status === "OK" && <ul className="suggestions-container" >{renderSuggestions()}</ul>}
        </div>
    )
}