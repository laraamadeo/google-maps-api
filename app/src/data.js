export function savePlaceInStorage(place) {
    const places = "places" in localStorage ? JSON.parse(localStorage.places) : []

    places.push(place)

    localStorage.places = JSON.stringify(places)
}

export const places = () => "places" in localStorage ? JSON.parse(localStorage.places) : []
