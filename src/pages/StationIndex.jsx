import { useEffect, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadAlbums, loadStations } from '../store/actions/station.actions'

import { AppHeader } from '../cmps/AppHeader.jsx'
import { StationIndexPreview } from '../cmps/StationIndexPreview.jsx'
import { WideStationPreview } from '../cmps/WideStationPreview.jsx'
import ResizeObserver from 'resize-observer-polyfill'
import { stationService } from '../services/station/station.service.remote.js'
import { AppFooter } from '../cmps/AppFooter.jsx'
import { Loading } from '../cmps/Loading.jsx'
import axios from 'axios'
import { Login } from './Login.jsx'

export function StationIndex() {
  const user = useSelector((storeState) => storeState.userModule.user)
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  )
  const albums = useSelector(
    (storeState) => storeState.stationModule.albums
  )
  const currSong = useSelector(
    (storeState) => storeState.stationModule.currSong
  )
  const [pageWidth, setPageWidth] = useState(window.innerWidth)
  var numElements = 0
  useEffect(() => {
    loadAlbums()
      .catch(err => {
        showErrorMsg('Cannot load stations!')
        throw err
      })
    loadStations()
      .catch(err => {
        showErrorMsg('Cannot load stations!')
        throw err
      })
    const handleResize = () => {
      setPageWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
  }, [ pageWidth,user])
  const elPlayer = document.querySelector('.app-player')
  if (elPlayer && currSong && pageWidth < 500) {
    elPlayer.style.display = 'flex'
  } else if (elPlayer && pageWidth < 500) {
    elPlayer.style.display = 'none'
  }



  if (pageWidth > 500) {
    if (pageWidth < 1250) {
      numElements = 3
    } else if (pageWidth < 1420) {
      numElements = 4
    } else if (pageWidth < 1750) {
      numElements = 5
    } else if (pageWidth < 1970) {
      numElements = 6
    } else if (pageWidth < 2250) {
      numElements = 7
    } else if (pageWidth > 2250) {
      numElements = 8
    }
  } else {
    numElements = 8
  }

  var numWides = 8
  if (pageWidth < 500) {
    numWides = 4
  }

  const elDetails = document.querySelector('.app-player')
  if (elDetails) {
    elDetails.classList.remove('details-player')

  }
  if (pageWidth < 500 && !user) {
    return <Login />
  }
  
  if (!stations || !albums) return <Loading />
  const stationFeatured = stations.filter(
    (station) => station.category === 'featured'
  )
  const stationRap = stations.filter((station) => station.category === 'rap')

  return (
    <section className='list-container'>
      <AppHeader />
      <section className='wide-stations-container'>
        {stations.slice(8, 8 + numWides).map((station) => (
          <WideStationPreview key={station._id} station={station} />
        ))}
      </section>
      <h1 className='title-category'>Featured</h1>
      <section className='home-container'>
        {stationFeatured.slice(0, numElements).map((station) => (
          <StationIndexPreview key={station._id} station={station} />
        ))}
      </section>
      <h1 className='title-category'>Rap</h1>
      <section className='home-container'>
        {stationRap.slice(0, numElements).map((station) => (
          <StationIndexPreview key={station._id} station={station} />
        ))}
      </section>
      <h1 className='title-category'>New Releases</h1>
      <section className='home-container'>
        {albums.slice(0, numElements).map((station) => (
          <StationIndexPreview key={station._id} station={station} />
        ))}
      </section>
      <AppFooter />
    </section>
  )
}
