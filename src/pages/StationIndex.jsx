import { useEffect } from 'react'
import { StationList } from "../cmps/StationList";
import { useSelector } from 'react-redux'
import { loadStations } from "../store/actions/station.actions";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { AppHeader } from '../cmps/AppHeader.jsx';
import { StationIndexPreview } from '../cmps/StationIndexPreview.jsx';


export function StationIndex() {
    const stations = useSelector(storeState => storeState.stationModule.stations)

    return (
        <section className="list-container">
            <AppHeader />
            <h1>Try some thing else</h1>
            <section className="home-container">
                
              {stations.map((station) => (
                <StationIndexPreview key={station._id} station={station} />
            ))}   
            </section>
           
        </section>
    )

}