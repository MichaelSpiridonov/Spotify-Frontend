import { loadStation } from '../store/actions/station.actions.js'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export function StationDetails() {
  const { stationId } = useParams()

  const station = useSelector((storeState) => storeState.stationModule.station)

  useEffect(() => {
    loadStation(stationId)
  }, [stationId])

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
  }

  if (!station) return <div>Loading...</div>

  return (
    <ul className='station-details'>
      <Link to='/'>Back to list</Link>
      {station.songs.map((song) => (
        <li key={song.id}>
          <button>▶</button>
          <img className='station-image' src={song.imgUrl} alt={song.title} />
          <span>{song.title}</span>
          <span></span> {/* Placeholder for song album */}
          <span>{formatDate(song.addedAt)}</span>
          <button>+</button>
          <span>0:00</span> {/* Placeholder for song length */}
        </li>
      ))}
    </ul>
  )
}
