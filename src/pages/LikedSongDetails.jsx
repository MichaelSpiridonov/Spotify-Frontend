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

/* import { SongOptionsModal } from '../cmps/SongOptionsModal.jsx' */

import { AppHeader } from '../cmps/AppHeader.jsx'
import { FastAverageColor } from 'fast-average-color'
import { MoreModal } from '../cmps/modals/MoreModal.jsx'

export function LikeSongsDeatils() {
  const likedSongs = useSelector(
    (storeState) => storeState.stationModule.likedSongs
  )

  const currSong = useSelector(
    (storeState) => storeState.stationModule.currSong
  )
  const [color, setColor] = useState(null)

  useEffect(() => {
    const fac = new FastAverageColor()

    fac
      .getColorAsync(likedSongs[0].createdBy.imgUrl)
      .then((color) => {
        setColor(color.rgb)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])
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

  const gradientStyle = {
    backgroundImage: `linear-gradient(${color}, black 50%)`,
  }
  if (!likedSongs) return <div>Loading...</div>
  console.log(likedSongs[0].songs[0].imgUrl)
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
            src={likedSongs[0].createdBy.imgUrl}
            alt={likedSongs[0].createdBy.fullname}
          />
          <div className='station-info'>
            <h1 className='station-name'>{likedSongs[0].name}</h1>
            <h2>Or Bracha · {likedSongs[0].songs.length} songs</h2>
          </div>
        </div>
        <ul className='station-details-gtid'>
          {likedSongs[0].songs.map((song) => (
            <li key={song.id} className='item'>
              <div className='play-button' onClick={() => onClickPlay(song)}>
                <PlayIcon />
              </div>
              <img src={song.imgUrl} className='song-image' alt={song.title} />
              <span className='song-info'>{song.title}</span>
              <span></span> {/* Placeholder for song album */}
              <span>{formatDate(song.addedAt)}</span>
              <div className='add-button'>
                <AddIcon />
              </div>
              <span className='song-length'>
                {formatDuration(song.duration)}
              </span>
              <div
                className='options-button'
                onClick={(e) => handleOptionsClick(song, e.currentTarget)}
              >
                <SongOptionsIcon />
              </div>
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
