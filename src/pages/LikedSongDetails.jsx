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

export function LikeSongsDeatils() {
  const likedSongs = useSelector((storeState) => storeState.stationModule.likedSongs)
  console.log(likedSongs)
  const currSong = useSelector(
    (storeState) => storeState.stationModule.currSong
  )
  const [selectedSong, setSelectedSong] = useState(null)
  const [buttonRef, setButtonRef] = useState(null) // State to store the button ref

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

  if (!likedSongs) return <div>Loading...</div>

  return (
    <React.Fragment>
      <div className='liked-details-container'>
        {/* <AppHeader /> */}
        {/* <Link to='/' className='back-link'>
        Back to list
      </Link> */}
        <div className='liked-header'>
          {/* <div className='nav-button' onClick={() => history.goBack()}>
            <BackIcon className='nav-icon' />
          </div>
          <div className='nav-button' onClick={() => history.goForward()}>
            <ForwardIcon className='nav-icon' />
          </div> */}

          <img
            className='liked-image'
            src={likedSongs.createdBy.imgUrl}
            alt={likedSongs.createdBy.fullname}
          />
          <div className='liked-info'>
            <h1 className='liked-name'>{likedSongs.name}</h1>
           
          </div>
        </div>
        <ul className='liked-details'>
          {likedSongs.songs.map((song) => (
            <li key={song.id} className='liked-item'>
              <button className='liked-button' onClick={() => onClickPlay(song)}>
                <PlayIcon />
              </button>
              <img className='liked-image' src={song.imgUrl} alt={song.title} />
              <span className='liked-info'>{song.title}</span>
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
          <MoreModal
            song={selectedSong}
            onClose={handleCloseModal}
            buttonRef={buttonRef}
          />
        )}
      </div>
    </React.Fragment>
  )
}
