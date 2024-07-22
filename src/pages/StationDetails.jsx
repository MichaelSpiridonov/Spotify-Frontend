import { loadStation, updateSong } from '../store/actions/station.actions.js'
import { useParams } from 'react-router-dom'
import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import PlayIcon from '../assets/icons/play.svg?react'
import AddIcon from '../assets/icons/addsong.svg?react'
import SongOptionsIcon from '../assets/icons/song_options.svg?react'
import LikedIcon from '../assets/icons/likedsong.svg?react'
// import BackIcon from '../assets/icons/back.svg?react'
// import ForwardIcon from '../assets/icons/forward.svg?react'

import { SongOptionsModal } from '../cmps/SongOptionsModal.jsx'
import { MoreModal } from '../cmps/MoreModal.jsx'
import { stationService } from '../services/station/station.service.local.js'
import { AppHeader } from '../cmps/AppHeader.jsx'
import { FastAverageColor } from 'fast-average-color'

export function StationDetails() {
  const { stationId } = useParams()
  const currSong = useSelector(
    (storeState) => storeState.stationModule.currSong
  )
  const [selectedSong, setSelectedSong] = useState(null)
  const [buttonRef, setButtonRef] = useState(null) // State to store the button ref
  const [station, setStation] = useState(null)
  const [color, setColor] = useState(null)
  useEffect(() => {
    loadLocalStation(stationId)
  }, [stationId])

  async function loadLocalStation(stationId) {
    const station = await stationService.getById(stationId)
    setStation(station)
  }

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
    loadStation(stationId)
  }
  if (station) {
    console.log(station)
    const fac = new FastAverageColor()

    fac.getColorAsync(station.createdBy.imgUrl).then((color) => {
      setColor(color.rgb)
    })
  }
  const gradientStyle = { backgroundImage: `linear-gradient(${color}, black)` }
  if (!station) return <div>Loading...</div>

  return (
    <React.Fragment>
      <div style={gradientStyle} className='station-details-container'>
        <AppHeader />
        {/* <AppHeader /> */}
        {/* <Link to='/' className='back-link'>
        Back to list
      </Link> */}
        <div className='station-header'>
          {/* <div className='nav-button' onClick={() => history.goBack()}>
            <BackIcon className='nav-icon' />
          </div>
          <div className='nav-button' onClick={() => history.goForward()}>
            <ForwardIcon className='nav-icon' />
          </div> */}

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
              <span className='song-length'>
                {formatDuration(song.duration)}
              </span>
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
    </React.Fragment>
  )
}
