import { GoogleMap, Marker } from '@react-google-maps/api'
import './Map.css'
import { useState, useCallback, useEffect, Suspense } from 'react'
import { places } from '../data'
import { getLatLng, getGeocode } from "use-places-autocomplete"


export default function Map({ isLoaded, marker, lastUpdate }) {

    const [markers, setMarkers] = useState([])

    useEffect(() => {
        refreshPlaces()
    }, [lastUpdate])

    useEffect(() => {
        refreshPlaces()
        console.log('load map punto', markers.length)
    }, [])


    useEffect(() => {
        if (markers.length > 0)
            console.log(markers)
    }, [markers])

    const refreshPlaces = () => {
        const tempPlc = []
        const places_ = places()
        places_.forEach(plc => {
            tempPlc.push({ lat: plc[1], lng: plc[2] })
        })
        setMarkers(tempPlc)
    }


    return <>
        <div className='map-container'>
            {!isLoaded && <p>Loading...</p>}
            {isLoaded && <>

                <GoogleMap
                    zoom={10}
                    center={marker ? marker : { lat: 41.38879, lng: 2.15899 }} mapContainerClassName='map-size'
                >
                    {marker && <Marker position={marker} />}
                    <Marker position={{ lat: 38.7222524, lng: -9.1393366 }} />
                    {markers.length > 0 && markers.map((mrkr, index) => <Marker key={index} position={mrkr} />)}
                </GoogleMap>
            </>}
        </div>
    </>
}