import { useEffect } from 'react'
import { StationList } from "../cmps/StationList";
import { useSelector } from 'react-redux'
import { loadStations } from "../store/actions/station.actions";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'


export function StationIndex() {
    

    return (
        <section className="list-container">
            
        </section>
    )
    
}