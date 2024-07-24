import { useEffect } from 'react'
import { StationList } from '../cmps/StationList'
import { useSelector } from 'react-redux'
import { loadStations } from '../store/actions/station.actions'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { AppHeader } from '../cmps/AppHeader.jsx'
import { StationIndexPreview } from '../cmps/StationIndexPreview.jsx'
import { WideStationPreview } from '../cmps/WideStationPreview.jsx'

export function StationIndex() {
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  )
  if (!stations) return <div>Loading....</div>
  return (
    <section className='list-container'>
      <AppHeader />
      <section className='wide-stations-container'>
        {stations.slice(8, 16).map((station) => (
          <WideStationPreview key={station._id} station={station} />
        ))}
      </section>
      <h1>Your shows</h1>
      <section className='home-container'>
        {stations.slice(8, 16).map((station) => (
          <StationIndexPreview key={station._id} station={station} />
        ))}
      </section>
    </section>
  )
}
