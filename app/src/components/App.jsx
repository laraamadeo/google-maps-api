import { useEffect, useState } from 'react'
import './App.css'
import Map from './Map'
import PlacesAutocomplete from './PlacesAutocomplete'
import { useLoadScript, useJsApiLoader } from '@react-google-maps/api'
import InfoBox from './InfoBox'
import SaveBox from './SaveBox'

const libraries = ["places"]

function App() {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API,
    libraries
  })


  const [latLng, setLatLng] = useState()
  const [lastUpdate, setLastUpdate] = useState(Date.now())
  const [city, setCity] = useState()

  return <>
    <div className='app-screen'>
      <div className='left-side'>
        <Map isLoaded={isLoaded} marker={latLng} lastUpdate={lastUpdate} />
      </div>
      <div className='right-side'>
        <PlacesAutocomplete isLoaded={isLoaded} currentPos={(pos) => setLatLng(pos)} selectedItem={([desc, lat, lng]) => setCity([desc, lat, lng])} />
        <InfoBox city={city} handleRefresh={() => setLastUpdate(Date.now())} setter={setLatLng} />
        <SaveBox lastUpdate={lastUpdate} />
      </div>
    </div>
  </>

}

export default App
