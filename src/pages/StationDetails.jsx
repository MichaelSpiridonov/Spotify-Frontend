import {
  loadStation,
  setCurrSelectedSong,
  setCurrSelectedStation,
  setCurrStation,
  setIsPlaying,
  updateSong,
} from '../store/actions/station.actions.js'
import { useParams } from 'react-router-dom'
import React, { useEffect, useState, useLayoutEffect } from 'react'

import PlayIcon from '../assets/icons/play.svg?react'
import PauseIcon from '../assets/icons/pause.svg?react'
import AddIcon from '../assets/icons/addsong.svg?react'
import LikeIcon from '../assets/icons/likedsong.svg?react'
import SongOptionsIcon from '../assets/icons/song_options.svg?react'
import SearchIcon from '../assets/icons/search.svg?react'

import { MoreModal } from '../cmps/modals/MoreModal.jsx'
import { AppHeader } from '../cmps/AppHeader.jsx'
import { AppFooter } from '../cmps/AppFooter.jsx'
import { FastAverageColor } from 'fast-average-color'
import { youtubeService } from '../services/youtube'
import { formatPlaylistDuration } from '../services/util.service.js'
import { SongList } from '../cmps/SongList.jsx'
import { SearchPreview } from '../cmps/SearchPreview.jsx'
import { useSelector } from 'react-redux'
import { Loading } from '../cmps/Loading.jsx'
import { stationService } from '../services/station/station.service.remote.js'

export function StationDetails() {
  const { stationId } = useParams()
  const [color, setColor] = useState(null)
  const [search, setSearch] = useState(null)
  const [station, setStation] = useState(null)

  const user = useSelector((storeState) => storeState.userModule.user)
  const isPlaying = useSelector((storeState) => storeState.stationModule.isPlaying)
  const currStation = useSelector((storeState) => storeState.stationModule.currStation)
  const playerStation = useSelector((storeState) => storeState.stationModule.station)
  const currSong = useSelector((storeState) => storeState.stationModule.currSong)
  const player = useSelector((storeState) => storeState.stationModule.player)
  const [pageWidth, setPageWidth] = useState(window.innerWidth)

  useLayoutEffect(() => {
    // Function to handle resize event
    const handleResize = () => {
      setPageWidth(window.innerWidth)
    }

    // Attach resize event listener
    window.addEventListener('resize', handleResize)

    // Clean up function
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [pageWidth])

  useEffect(() => {
    setStationPrm(stationId)
  }, [stationId])

  async function setStationPrm(stationId) {
    let station = await stationService.getById(stationId)
    if (!station) {
      station = await stationService.getAlbumById(stationId)
    }
    setStation(station)
    setCurrStation(station)
  }

  function handleChange({ target }) {
    setSearch(target.value)
  }

  var id
  async function getVideoId(name) {
    id = await youtubeService.getVideos(name)
    return id[0].videoId
  }

  function calculateTotalDuration(songs) {
    const totalDuration = songs.reduce((acc, song) => acc + song.duration, 0)
    return formatPlaylistDuration(totalDuration)
  }

  async function onClickPlay(song) {
    if(isPlaying || currSong && isPlaying){
      player.pauseVideo()
      setIsPlaying(false)
    } else {
      player.playVideo()
      setIsPlaying(true)
    }
    if (!song.id) {
      song.id = await getVideoId(song.title)
    }
    const songData = {
      title: song.title,
      id: song.id,
      imgUrl: song.imgUrl,
      artists: song.artists,
      _id: song._id,
      likedBy: song.likedBy,
    }
    updateSong(songData)
    loadStation(stationId)
  }
  const elPlayer = document.querySelector('.app-player')
  if (elPlayer && currSong && pageWidth < 500) {
    elPlayer.style.display = 'flex'
  } else if (elPlayer && pageWidth < 500) {
    elPlayer.style.display = 'none'
  }

  function onAddTo(event, song) {
    setCurrSelectedStation(currStation)
    setCurrSelectedSong(song)
    /* setSongToAdd(song) */
    const x = event.clientX - 110
    const y = event.clientY + 20
    const elModal = document.querySelector('.more-modal')
    elModal.style.left = `${x}px`
    elModal.style.top = `${y}px`
    elModal.style.display = 'block'
    event.stopPropagation()
  }

  window.onclick = function (event) {
    const elModal = document.querySelector('.more-modal')
    if (event.target !== elModal && elModal) {
      elModal.style.display = 'none'
    }
  }
  if (currStation) {
    if (currStation.imgUrl) {
      const fac = new FastAverageColor()
      fac.getColorAsync(currStation.imgUrl).then((color) => {
        setColor(color.rgb)
      })
    } else if (!color) {
      setColor('rgba(66, 64, 64, 0.6) 0')
    }
  }
  if (!station || !currStation) return <Loading />
  const gradientStyle = {
    backgroundImage: `linear-gradient(${color}, #121212 90%)`,
  }
  if (pageWidth < 500) {
    if (document.querySelector('.user-login'))
      document.querySelector('.user-login').style.display = 'none'
  }
  return (
    <React.Fragment>
      <div className='station-details-container'>
        <section style={gradientStyle}>
          {pageWidth > 500 && <AppHeader color={color} />}
          <div className='station-header'>
            {currStation.imgUrl && (
              <img
                className='station-image'
                src={currStation.imgUrl}
                alt={station.createdBy ? station.createdBy.fullname : ''}
              />
            )}
            {!currStation.imgUrl && (
              <div className='station-none-image'>
                <svg
                  data-encore-id='icon'
                  role='img'
                  aria-hidden='true'
                  data-testid='playlist'
                  className='Svg-sc-ytk21e-0 bneLcE'
                  viewBox='0 0 24 24'
                >
                  <path d='M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z'></path>
                </svg>
              </div>
            )}
            <div className='station-info'>
              <h3>Playlist</h3>
              <h1 className='station-name'>{station.name}</h1>
              <h2 className='station-description'>{station.description}</h2>
              <p className='station-creator'>
                {user ? (
                  <img
                    src={user.imgUrl}
                    className='user-login'
                  ></img>
                ) : (
                  ''
                )}{' '}
                {station.createdBy ? station.createdBy.fullname + ' ·' : ''}{' '}
                {station.songs.length} songs
                {station.songs.length
                  ? `, ${calculateTotalDuration(currStation.songs)}`
                  : ''}
              </p>
            </div>
          </div>
        </section>
        <div className='station-controls'>
          <button
            onClick={() => onClickPlay(station.songs[0])}
            className='header-play-button'
          >
            {isPlaying && playerStation._id === station._id ? <PauseIcon /> : <PlayIcon />}
          </button>
          <div
            className={`header-add-button ${
              station.likedByUsers?.find(
                (likeUser) => likeUser._id === user?._id
              )
                ? 'like-icn'
                : ''
            }`}
          >
            {station.likedByUsers?.find(
              (likeUser) => likeUser._id === user?._id
            ) ? (
              <LikeIcon />
            ) : (
              <AddIcon />
            )}
          </div>
          <div className='header-options-button'>
            <SongOptionsIcon />
          </div>
        </div>

        <section className='station-details'>
          {station.songs[0] && (
              <div className='table-header'>
                <span>#</span>
                <span>Title</span>
                {station.createdBy && <span>Album</span>}
                {station.createdBy && <span>Date added</span>}
                <span>
                  <svg
                    data-encore-id='icon'
                    role='img'
                    aria-hidden='true'
                    viewBox='0 0 16 16'
                    className='Svg-sc-ytk21e-0 dYnaPI'
                  >
                    <path d='M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z'></path>
                    <path d='M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z'></path>
                  </svg>
                </span>
              </div>
          )}
          {!station.songs[0] && (
            <h1 className='header-input'>
              Let&apos;s find something for your playlist
            </h1>
          )}
          {!station.songs[0] && (
            <form
              className='search-details'
              action=''
            >
              <label htmlFor=''>
                <SearchIcon className />
              </label>
              <input
                onChange={handleChange}
                value={search ? search : ''}
                placeholder='Search for songs'
                type='text'
              />
            </form>
          )}
          <SongList
                songs={station.songs}
                onClickPlay={onClickPlay}
                onAddTo={onAddTo}
              />
          <section className='station-details'>
            {search &&
              station.songs.map((song) => (
                <SearchPreview
                  key={song.videoId}
                  song={song}
                />
              ))}
          </section>
          <MoreModal />
        </section>
        <AppFooter />
      </div>
    </React.Fragment>
  )
}
