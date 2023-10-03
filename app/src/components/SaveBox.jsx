import { useEffect, useState } from 'react'
import './SaveBox.css'
import { places } from '../data'

export default function SaveBox({ lastUpdate }) {
    const [savedPlaces, setSavedPlaces] = useState()

    const retrievePlaces = () => {
        let saved = []
        const places_ = places()
        places_.forEach(plc => {
            saved.push(plc[0])
        })
        setSavedPlaces(saved)
    }

    useEffect(() => {
        retrievePlaces()
    }, [lastUpdate])


    return <>
        <section>
            <p className='saveBox-label'>Save places</p>
            <ul className='saveBox-list'>
                {savedPlaces && savedPlaces.map((place, index) => <li className="saveBox-text" key={index}>{place}</li>)}
            </ul>
        </section>
    </>
}