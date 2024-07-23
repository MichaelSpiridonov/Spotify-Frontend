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

import { SongOptionsModal } from '../cmps/modals/SongOptionsModal.jsx'
import { MoreModal } from '../cmps/modals/MoreModal.jsx'
import { stationService } from '../services/station/station.service.local.js'
import { AppHeader } from '../cmps/AppHeader.jsx'
import { FastAverageColor } from 'fast-average-color'
import YouTube from 'react-youtube'
import { getVideos } from '../services/youtube.service.js'

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
  var id
  async function getVideoId(name) {
    id = await getVideos(name)
    console.log(id[0].videoId)
    return id[0].videoId
  }
  const onClickPlay = async (song) => {
    if (!song.id) {
      song.id = await getVideoId(song.title)
    }
    console.log(song.id)
    const songData = { title: song.title, id: song.id, imgUrl: song.imgUrl }
    updateSong(songData)
    loadStation(stationId)
  }

  if (station) {
    console.log()
    const fac = new FastAverageColor()

    fac.getColorAsync(station.createdBy.imgUrl).then((color) => {
      setColor(color.rgb)
    })
  }
  console.log(station)
  if (!station) return
  const gradientStyle = { backgroundImage: `linear-gradient(${color}, black 50%)` }
  return (
    <React.Fragment>
      <div style={gradientStyle} className='station-details-container'>
        <AppHeader />
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
        <div className='station-controls'>
          <button className='header-play-button'>
            {' '}
            {/* Updated className */}
            <PlayIcon />
          </button>
        </div>
        <div className='table-header'>
          <span>#</span>
          <span>Title</span>
          <span>Album</span>
          <span>Date added</span>
          <span>Duration</span>
        </div>
        <section className='station-details'>
          {station.songs.map((song) => (
            <section key={song.id} className='item'>
              <div className='play-button' onClick={() => onClickPlay(song)}>
                <PlayIcon />
              </div>
              <img className='song-image' src={song.imgUrl} alt={song.title} />
              <span className='song-info'>{song.title}</span>
              <span className='song-album'>{song.album}</span>
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
            </section>
          ))}
        </section>
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
