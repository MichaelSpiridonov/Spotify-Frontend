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
  const [songToAdd, setSongToAdd] = useState(null)
  const { stationId } = useParams()
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
  console.log(stationId)
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
    return id[0].videoId
  }
  const onClickPlay = async (song) => {
    if (!song.id) {
      song.id = await getVideoId(song.title)
    }
    console.log(song)
    const songData = { title: song.title, id: song.id, imgUrl: song.imgUrl, artists: song.artists, _id: song._id }
    updateSong(songData)
    loadStation(stationId)
  }
  function onAddTo(event) {
    /* setSongToAdd(song) */
    const x = event.clientX - 110
    const y = event.clientY + 20
    console.log(`Clicked at X=${x}, Y=${y}`)
    const elModal = document.querySelector('.more-modal')
    console.log(elModal)
    elModal.style.left = `${x}px`
    elModal.style.top = `${y}px`
    elModal.style.display = 'block'
  }
  if (station) {
    const fac = new FastAverageColor()

    fac.getColorAsync(station.createdBy.imgUrl).then((color) => {
      setColor(color.rgb)
    })
  }
  element.addEventListener("scroll", (event) => {
    console.log("Scroll event fired, waiting for scrollend...") ;
  });
  if (!station) return
  const gradientStyle = { backgroundImage: `linear-gradient(${color}, #121212 50%)` }
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
            <h3>Playlist</h3>
            <h1 className='station-name'>{station.name}</h1>
            <h2 className='station-description'>{station.description}</h2>
            <p className='station-creator'>
              {station.createdBy.fullname} · {station.songs.length} songs
            </p>
          </div>
        </div>
        <div className='station-controls'>
          <button className='header-play-button'>
            <PlayIcon />
          </button>
          <div className='header-add-button'>
            <AddIcon />
          </div>
          <div className='header-options-button'>
            <SongOptionsIcon />
          </div>
        </div>

        <section className='station-details'>
          <div className='table-header'>
            <span>#</span>
            <span>Title</span>
            <span>Album</span>
            <span>Date added</span>
            <span><svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" className="Svg-sc-ytk21e-0 dYnaPI"><path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path><path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"></path></svg></span>
          </div>
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
                onClick={onAddTo}
              >
                <SongOptionsIcon />
              </div>

              <MoreModal song={song} />
            </section>
          ))}
        </section>

      </div>
    </React.Fragment>
  )
}
