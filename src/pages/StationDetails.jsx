import { loadStation, loadStations, setCurrSelectedSong, setCurrSelectedStation, updateSong } from '../store/actions/station.actions.js'
import { Link, useParams } from 'react-router-dom'
import React, { useEffect, useState, useRef } from 'react'

import PlayIcon from '../assets/icons/play.svg?react'
import AddIcon from '../assets/icons/addsong.svg?react'
import SongOptionsIcon from '../assets/icons/song_options.svg?react'
import SearchIcon from '../assets/icons/search.svg?react'
import playlistDefaultImage from '../assets/icons/myplaylist.svg'

import { MoreModal } from '../cmps/modals/MoreModal.jsx'
import { stationService } from '../services/station'
import { AppHeader } from '../cmps/AppHeader.jsx'
import { AppFooter } from '../cmps/AppFooter.jsx'
import { FastAverageColor } from 'fast-average-color'
import { getVideos } from '../services/youtube.service.js'
import { formatDate, formatDuration } from '../services/util.service.js'
import { SongList } from '../cmps/SongList.jsx'
import { SearchPreview } from '../cmps/SearchPreview.jsx'
import { useSelector } from 'react-redux'

export function StationDetails() {
  const { stationId } = useParams()
  const [currStation, setCurrStation] = useState(null)
  const [color, setColor] = useState(null)
  const [search, setSearch] = useState(null)
  const [songs, setSongs] = useState([])
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  )


  useEffect(() => {
    loadLocalStation(stationId)  
  }, [stationId])
  var modalOpen = false
  async function loadLocalStation(stationId) {
    const station = await stationService.getById(stationId)
 
      setCurrStation(station)
   

  }

  useEffect(() => {
    getVideos(search).then(videos => setSongs(videos))
  }, [search])
  function handleChange({ target }) {
    setSearch(target.value)
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
    const songData = {
      title: song.title,
      id: song.id,
      imgUrl: song.imgUrl,
      artists: song.artists,
      _id: song._id,
    }
    updateSong(songData)
    loadStation(stationId)
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
    modalOpen = true
    event.stopPropagation();
  }

  /* function clickOutsideListener(event) {
    const elModal = document.querySelector('.more-modal')
    if (!elModal) return
    if (!elModal.contains(event.target) && elModal) {   
      // Click outside the target element
      elModal.style.display = 'none'
      modalOpen = true
      // Do something here, such as closing a modal, hiding a dropdown, etc.
    }
  }
  document.addEventListener('click', clickOutsideListener) */
  window.onclick = function (event) {
    const elModal = document.querySelector('.more-modal'))
    if (event.target !== elModal&& elModal) {
      elModal.style.display = "none";
    }
  }
  if (currStation) {
    if (!color) {

      if (currStation.createdBy.imgUrl) {
        const fac = new FastAverageColor()
        fac.getColorAsync(currStation.createdBy.imgUrl).then((color) => {
          setColor(color.rgb)
        })
      } else {
        setColor("rgba(66, 64, 64, 0.6) 0")
      }
    }

  }
  if (!currStation) return
  const gradientStyle = {
    backgroundImage: `linear-gradient(${color}, #121212 50%)`,
  }
  return (
    <React.Fragment>
      <div style={gradientStyle} className='station-details-container'>
        <AppHeader />
        <div className='station-header'>
          {currStation.createdBy.imgUrl && <img
            className='station-image'
            src={currStation.createdBy.imgUrl}
            alt={currStation.createdBy.fullname}
          />}
          {!currStation.createdBy.imgUrl &&
            <div className='station-none-image'>
              <svg data-encore-id="icon" role="img" aria-hidden="true" data-testid="playlist" class="Svg-sc-ytk21e-0 bneLcE" viewBox="0 0 24 24"><path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z"></path></svg>
            </div>

          }
          <div className='station-info'>
            <h3>Playlist</h3>
            <h1 className='station-name'>{currStation.name}</h1>
            <h2 className='station-description'>{currStation.description}</h2>
            <p className='station-creator'>
              {currStation.createdBy.fullname} · {currStation.songs.length} songs
            </p>
          </div>
        </div>
        <div className='station-controls'>
          <button onClick={() => onClickPlay(currStation.songs[0])} className='header-play-button'>
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
          {currStation.songs[0] && <div className='table-header'>
            <span>#</span>
            <span>Title</span>
            <span>Album</span>
            <span>Date added</span>
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
          {!currStation.songs[0] && <h1 className='header-input'>Let's find something for your playlist
          </h1>}
          <SongList songs={currStation.songs} onClickPlay={onClickPlay} onAddTo={onAddTo} />
          {!currStation.songs[0] && <form className='search-details' action=''>
            <label htmlFor=''><SearchIcon className /></label>
            <input onChange={handleChange} value={search ? search : ''} placeholder='Search for songs' type='text' />
          </form>}
          <section className='station-details' >
            {search && songs.map(song => <SearchPreview key={song.videoId} song={song} />)}

          </section>
          <MoreModal setCurrStation={setCurrStation} />
        </section>
        <AppFooter />
      </div>
    </React.Fragment>
  )
}
