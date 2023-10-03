
import { HiLockClosed, HiOutlineBookmark, HiX } from "react-icons/hi"
import './InfoBox.css'
import { savePlaceInStorage } from "../data"
import { useEffect, useState } from "react"
export default function InfoBox({ city, handleRefresh, setter }) {
    const [selectedCity, setSelectedCity] = useState()

    useEffect(() => {
        setSelectedCity(city)
    }, [city])

    const savePlace = () => {
        savePlaceInStorage(city)
        handleRefresh()

    }

    const clearPlace = () => {
        setSelectedCity(undefined)
        setter(undefined)
    }

    return <>
        <section>
            <p className="infoBox-label">Current selection</p>
            <div className="infoBox-container">
                <p className="infoBox-text">{selectedCity === undefined ? 'Start searching a city!' : selectedCity[0]}</p>
                {selectedCity !== undefined && <HiOutlineBookmark className="infoBox-icon" onClick={savePlace} />}
                <HiX className="infoBox-icon" onClick={clearPlace} />

            </div>
        </section>
    </>
}