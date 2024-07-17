import { useEffect } from 'react'
import { StationList } from "../cmps/StationList";
import { useSelector } from 'react-redux'
import { loadStations } from "../store/actions/station.actions";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'


export function StationIndex() {
    const stations = useSelector(storeState => storeState.stationModule.stations)
    console.log(stations)
    useEffect(() => {
        loadStations()
            .catch(err => {
                showErrorMsg('Cannot load toys!')
                throw err
            })
    }, [])

    return (
        <section className="list-container">
            <StationList stations={stations}/>
        </section>
    )
    
}