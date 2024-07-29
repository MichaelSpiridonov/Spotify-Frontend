import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { StationList } from '../cmps/StationList'
import { useSelector } from 'react-redux'
import { loadStations } from '../store/actions/station.actions'

import { AppHeader } from '../cmps/AppHeader.jsx'
import { StationIndexPreview } from '../cmps/StationIndexPreview.jsx'
import { WideStationPreview } from '../cmps/WideStationPreview.jsx'
import ResizeObserver from 'resize-observer-polyfill'
import { stationService } from '../services/station/station.service.local.js'
import { AppFooter } from '../cmps/AppFooter.jsx'

export function StationIndex() {
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  )
  const currSong = useSelector(
    (storeState) => storeState.stationModule.currSong
  )
  const [albums, setAlbums] = useState(null)
  var numElements = 0
  const [pageWidth, setPageWidth] = useState(window.innerWidth)

  useLayoutEffect(() => {
    // Function to handle resize event
    const handleResize = () => {
      setPageWidth(window.innerWidth)
    }

    // Attach resize event listener
    window.addEventListener('resize', handleResize)

    // Clean up function
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [pageWidth]) // Only run once on mount
  const elPlayer = document.querySelector('.app-player')
  if (elPlayer && currSong&& pageWidth<500) {
    elPlayer.style.display = 'flex'
  }else if(elPlayer&& pageWidth<500){
     elPlayer.style.display = 'none'
  }

  calculateNumberOfElements()
  function calculateNumberOfElements() {
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
  }
  var numWides = 6
  if(pageWidth<500){
    numWides=4
  }
  const elDetails = document.querySelector('.app-player')
  if(elDetails){
    elDetails.classList.remove('details-player')

  }
  if (!stations && !albums) return <div>Loading....</div>
  stationService.queryAlbums().then((albums) => setAlbums(albums))
  if (!albums) return
  const stationFeatured = stations.filter(
    (station) => station.category === 'featured'
  )
  const stationRap = stations.filter((station) => station.category === 'rap')
  return (
    <section className='list-container'>
      <AppHeader />
      <section className='wide-stations-container'>
        {stations.slice(8, 8+numWides).map((station) => (
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
        {albums[0].slice(0, numElements).map((station) => (
          <StationIndexPreview key={station._id} station={station} />
        ))}
      </section>
      <AppFooter />
    </section>
  )
}
