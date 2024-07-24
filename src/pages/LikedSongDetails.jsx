import { loadStation, updateSong } from '../store/actions/station.actions.js'
import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'

import PlayIcon from '../assets/icons/play.svg?react'
import AddIcon from '../assets/icons/addsong.svg?react'
import SongOptionsIcon from '../assets/icons/song_options.svg?react'

import { AppHeader } from '../cmps/AppHeader.jsx'
import { FastAverageColor } from 'fast-average-color'
import { MoreModal } from '../cmps/modals/MoreModal.jsx'
import { getVideos } from '../services/youtube.service.js'
import { formatDate, formatDuration } from '../services/util.service.js'

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

  const handleOptionsClick = (song, button) => {
    setSelectedSong(song)
    setButtonRef(button)
  }

  const handleCloseModal = () => {
    setSelectedSong(null)
    setButtonRef(null)
  }

  async function getVideoId(name) {
    const id = await getVideos(name)
    return id[0].videoId
  }

  const onClickPlay = async (song) => {
    console.log(song)
    if (!song.id) {
      song.id = await getVideoId(song.title)
    }
    const songData = { title: song.title, id: song.id, imgUrl: song.imgUrl, artists: song.artists }
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
        <div className='station-header'>

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
