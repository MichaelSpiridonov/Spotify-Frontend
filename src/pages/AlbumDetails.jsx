import { loadStation, loadStations, setCurrSelectedSong, setCurrSelectedStation, setCurrStation, updateSong, updateStation } from '../store/actions/station.actions.js'
import { Link, useParams } from 'react-router-dom'
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'

import PlayIcon from '../assets/icons/play.svg?react'
import PauseIcon from '../assets/icons/pause.svg?react'
import AddIcon from '../assets/icons/addsong.svg?react'
import LikeIcon from '../assets/icons/likedsong.svg?react'
import SongOptionsIcon from '../assets/icons/song_options.svg?react'
import SearchIcon from '../assets/icons/search.svg?react'
import playlistDefaultImage from '../assets/icons/myplaylist.svg'

import { MoreModal } from '../cmps/modals/MoreModal.jsx'
import { AppHeader } from '../cmps/AppHeader.jsx'
import { AppFooter } from '../cmps/AppFooter.jsx'
import { FastAverageColor } from 'fast-average-color'
import { getVideos } from '../services/youtube.service.js'
import { formatPlaylistDuration, makeId } from '../services/util.service.js'
import { SongList } from '../cmps/SongList.jsx'
import { SearchPreview } from '../cmps/SearchPreview.jsx'
import { useSelector } from 'react-redux'
import spotifyService from '../services/spotify.service.js'

export function AlbumDetails() {
  const { albumId } = useParams()
  const [albumDetails, setAlbumDetails] = useState(null)
  const [color, setColor] = useState(null)
  const [search, setSearch] = useState(null)
  const [songs, setSongs] = useState([])

  const user = useSelector(
    (storeState) => storeState.userModule.user
  )
  const currStation = useSelector(
    (storeState) => storeState.stationModule.currStation
  )
  const currSong = useSelector(
    (storeState) => storeState.stationModule.currSong
  )


  const [pageWidth, setPageWidth] = useState(window.innerWidth)

  function calculateTotalDuration(songs) {
    const totalDuration = songs.reduce((acc, song) => acc + song.duration_ms, 0);
    return formatPlaylistDuration(totalDuration);
  }

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
    getAlbum(albumId)
  }, [albumId])

  async function getAlbum(albumId) {
    const albumDet = await spotifyService.getAlbum(albumId)
    setAlbumDetails(albumDet)
  }

  function handleChange({ target }) {
    setSearch(target.value)
  }
  var id
  async function getVideoId(name) {
    id = await getVideos(name)
    return id[0].videoId
  }

  function calculateTotalDuration(songs) {
    const totalDuration = songs.reduce((acc, song) => acc + song.duration_ms, 0);
    return formatPlaylistDuration(totalDuration);
  }

  async function onClickPlay(song) {
    song._id = song.id
    song.id = null
    if (!song.id) {
      song.id = await getVideoId(song.name)
    }
    const songData = {
      title: song.name,
      id: song.id,
      imgUrl: albumDetails.images[0].url,
      artists: albumDetails.artists,
      _id: song._id,
      likedBy: song.likedBy || []
    }
    updateSong(songData)
    const newStation = {

      songs: albumDetails.tracks.items,
      name: albumDetails.name
    }
    console.log(newStation)
    const updated = await updateStation(newStation)
    console.log(updated)
    loadStation(updated._id)
  }
  const elPlayer = document.querySelector('.app-player')
  if (elPlayer && currSong && pageWidth < 500) {
    elPlayer.style.display = 'flex'
  } else if (elPlayer && pageWidth < 500) {
    elPlayer.style.display = 'none'
  }

  function onAddTo(event, song) {
    setCurrSelectedStation(currStation)
    song.title = song.name
    song.imgUrl = albumDetails.images[0].url
    song.addedAt = Date.now()
    song.duration = song.duration_ms
    song.albumName = albumDetails.name
    song.albumId = albumDetails.id
    song._id = song.id
    song.id = null
    setCurrSelectedSong(song)
    /* setSongToAdd(song) */
    const x = event.clientX - 110
    const y = event.clientY + 20
    const elModal = document.querySelector('.more-modal')
    elModal.style.left = `${x}px`
    elModal.style.top = `${y}px`
    elModal.style.display = 'block'
    event.stopPropagation();
  }

  window.onclick = function (event) {
    const elModal = document.querySelector('.more-modal')
    if (event.target !== elModal && elModal) {
      elModal.style.display = "none";
    }
  }
  if (albumDetails) {
    if (albumDetails.images[0].url) {
      const fac = new FastAverageColor()
      fac.getColorAsync(albumDetails.images[0].url).then((color) => {
        setColor(color.rgb)
      })
    } else {
      setColor("rgba(66, 64, 64, 0.6) 0")
    }

  }
  if (!albumDetails) return
  const gradientStyle = {
    backgroundImage: `linear-gradient(${color}, #121212 90%)`
  }
  return (
    <React.Fragment>
      <div  className='album-details-container'>
        <section style={gradientStyle}>
          <AppHeader />
          <div className='album-header'>
            {albumDetails.images[0].url && <img
              className='station-image'
              src={albumDetails.images[0].url}
              alt={albumDetails.artists[0].name}
            />}
            {!albumDetails &&
              <div className='album-none-image'>
                <svg data-encore-id="icon" role="img" aria-hidden="true" data-testid="playlist" class="Svg-sc-ytk21e-0 bneLcE" viewBox="0 0 24 24"><path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z"></path></svg>
              </div>

            }
            <div className='album-info'>
              <h3>{albumDetails.album_type.replace(/(?:^|\s|[-"'([{])+\S/g, (c) => c.toUpperCase())}</h3>
              <h1 className='album-name'>{albumDetails.name}</h1>
              <h2 className='album-description'>{albumDetails.description}</h2>
              <p className='album-creator'>
                {albumDetails.artists[0].name} · {albumDetails.tracks.items.length} { albumDetails.tracks.items.length > 1 ? 'songs': 'song'}{(albumDetails.tracks.items.length) ? `, ${calculateTotalDuration(albumDetails.tracks.items)}` : ''}
              </p>
            </div>
          </div>
          </section>
          <div className='album-controls'>
            <button onClick={() => onClickPlay(albumDetails.tracks.items[0])} className='header-play-button'>
              {(!currSong) ? <PlayIcon /> : <PauseIcon />}
            </button>
            <div className={`header-add-button ${(albumDetails.likedByUsers?.find(likeUser => likeUser._id === user?._id)) ? 'like-icn' : ''}`}>
              {(albumDetails.likedByUsers?.find(likeUser => likeUser._id === user?._id)) ? <LikeIcon /> : <AddIcon />}
            </div>
            <div className='header-options-button'>
              <SongOptionsIcon />
            </div>
          </div>
        
        <section className='album-details'>
          {albumDetails.tracks.items[0] && <div className='table-header'>
            <span>#</span>
            <span>Title</span>
            <span>Plays</span>
            <span></span>
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
          </div>}
          <SongList songs={albumDetails.tracks.items} onClickPlay={onClickPlay} onAddTo={onAddTo} />
          <MoreModal />
        </section>
        <AppFooter />
      </div>
    </React.Fragment>
  )
}
