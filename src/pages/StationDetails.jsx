import { loadStation } from '../store/actions/station.actions.js'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import playIcon from '../assets/icons/play.svg?react'
import addIcon from '../assets/icons/addsong.svg?react'

export function StationDetails() {
  const { stationId } = useParams()

  const station = useSelector((storeState) => storeState.stationModule.station)

  useEffect(() => {
    loadStation(stationId)
  }, [stationId])

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const options = { month: 'short', day: '2-digit', year: 'numeric' }
    return date.toLocaleDateString('en-US', options)
  }

  if (!station) return <div>Loading...</div>

  return (
    <div className='station-details-container'>
      <Link to='/' className='back-link'>
        Back to list
      </Link>
      <ul className='station-details'>
        {station.songs.map((song) => (
          <li key={song.id}>
            <button className='play-button'>
              <img src={playIcon} alt='Play' />
            </button>
            <img className='station-image' src={song.imgUrl} alt={song.title} />
            <span>{song.title}</span>
            <span></span> {/* Placeholder for song album */}
            <span>{formatDate(song.addedAt)}</span>
            <button className='add-button'>
              <img src={addIcon} alt='Add' />
            </button>
            <span>0:00</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
