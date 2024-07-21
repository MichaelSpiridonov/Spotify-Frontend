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
import { AppHeader } from '../cmps/AppHeader.jsx'
import { FastAverageColor } from 'fast-average-color'

export function LikeSongsDeatils() {
  const likedSongs = useSelector((storeState) => storeState.stationModule.likedSongs)
  console.log(likedSongs)
  const currSong = useSelector((storeState) => storeState.stationModule.currSong )
  const [color, setColor] = useState(null)

    useEffect(() => {
        const fac = new FastAverageColor();

        fac.getColorAsync(likedSongs.createdBy.imgUrl)
            .then(color => {
                setColor(color.rgb)
            })
            .catch(e => {
                console.log(e);
            });
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
  
  const gradientStyle = { backgroundImage: `linear-gradient(${color}, black)`}
  if (!likedSongs) return <div>Loading...</div>

  return (
    <React.Fragment>
      <div  style={gradientStyle} className='liked-details-container'>
      <AppHeader/>
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
           <h2>Or Bracha · {likedSongs.songs.length}  songs</h2>
          </div>
        </div>
        <ul className='station-details'>
          {likedSongs.songs.map((song) => (
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
