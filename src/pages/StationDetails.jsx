import { loadStation, updateSong } from '../store/actions/station.actions.js'
import { useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import PlayIcon from '../assets/icons/play.svg?react'
import AddIcon from '../assets/icons/addsong.svg?react'
import SongOptionsIcon from '../assets/icons/song_options.svg?react'
import LikedIcon from '../assets/icons/likedsong.svg?react'

import { SongOptionsModal } from '../cmps/SongOptionsModal.jsx'

export function StationDetails() {
  const { stationId } = useParams()
  const station = useSelector((storeState) => storeState.stationModule.station)
  const currSong = useSelector(
    (storeState) => storeState.stationModule.currSong
  )
  const [selectedSong, setSelectedSong] = useState(null)
  const [buttonRef, setButtonRef] = useState(null) // State to store the button ref

  useEffect(() => {
    loadStation(stationId)
  }, [stationId])

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const options = { month: 'short', day: '2-digit', year: 'numeric' }
    return date.toLocaleDateString('en-US', options)
  }

  const formatDuration = (duration) => {
    if (!duration) return '00:00'
    const minutes = Math.floor(duration / 60000)
    const seconds = Math.floor((duration % 60000) / 1000)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const handleOptionsClick = (song, button) => {
    setSelectedSong(song)
    setButtonRef(button)
  }

  const handleCloseModal = () => {
    setSelectedSong(null)
    setButtonRef(null)
  }

  const onClickPlay = (song) => {
    const songData = { title: song.title, id: song.id, imgUrl: song.imgUrl }
    updateSong(songData)
  }

  if (!station) return <div>Loading...</div>

  return (
    <div className='station-details-container'>
      {/* <Link to='/' className='back-link'>
        Back to list
      </Link> */}
      <div className='station-header'>
        <img
          className='station-image'
          src={station.createdBy.imgUrl}
          alt={station.createdBy.fullname}
        />
        <div className='station-info'>
          <h1 className='station-name'>{station.name}</h1>
          <p className='station-creator'>
            Created by {station.createdBy.fullname}
          </p>
        </div>
      </div>
      <ul className='station-details'>
        {station.songs.map((song) => (
          <li key={song.id} className='song-item'>
            <button className='play-button' onClick={() => onClickPlay(song)}>
              <PlayIcon />
            </button>
            <img className='song-image' src={song.imgUrl} alt={song.title} />
            <span className='song-info'>{song.title}</span>
            <span></span> {/* Placeholder for song album */}
            <span>{formatDate(song.addedAt)}</span>
            <button className='add-button'>
              <AddIcon />
            </button>
            <span className='song-length'>{formatDuration(song.duration)}</span>
            <button
              className='song-options-button'
              onClick={(e) => handleOptionsClick(song, e.currentTarget)}
            >
              <SongOptionsIcon />
            </button>
          </li>
        ))}
      </ul>
      {selectedSong && (
        <SongOptionsModal
          song={selectedSong}
          onClose={handleCloseModal}
          buttonRef={buttonRef}
        />
      )}
    </div>
  )
}
