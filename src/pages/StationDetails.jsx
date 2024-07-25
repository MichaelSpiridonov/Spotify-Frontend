import { loadStation, setCurrSelectedSong, setCurrSelectedStation, updateSong } from '../store/actions/station.actions.js'
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

export function StationDetails() {
  const { stationId } = useParams()
  const [station, setStation] = useState(null)
  const [color, setColor] = useState(null)
  const [search, setSearch] = useState(null)
  const [songs, setSongs] = useState([])
  useEffect(() => {
    loadLocalStation(stationId)
  }, [stationId])
  var count = 0
  async function loadLocalStation(stationId) {
    const station = await stationService.getById(stationId)
    setStation(station)
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

  function onAddTo(event, song, station) {
    setCurrSelectedStation(station)
    setCurrSelectedSong(song)
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

  function clickOutsideListener(event) {
    const elModal = document.querySelector('.more-modal')
    count++
    if (!elModal) return
    if (!elModal.contains(event.target) && count == 2) {
      count = 0
      // Click outside the target element
      elModal.style.display = 'none'
      // Do something here, such as closing a modal, hiding a dropdown, etc.
    }
  }
  document.addEventListener('click', clickOutsideListener)
  if (station) {
    if (!color) {

      if (station.createdBy.imgUrl) {
        const fac = new FastAverageColor()
        fac.getColorAsync(station.createdBy.imgUrl).then((color) => {
          setColor(color.rgb)
        })
      } else {
        setColor("rgba(66, 64, 64, 0.6) 0")
      }
    }

  }
  if (!station) return
  const gradientStyle = {
    backgroundImage: `linear-gradient(${color}, #121212 50%)`,
  }
  return (
    <React.Fragment>
      <div style={gradientStyle} className='station-details-container'>
        <AppHeader />
        <div className='station-header'>
          {station.createdBy.imgUrl && <img
            className='station-image'
            src={station.createdBy.imgUrl}
            alt={station.createdBy.fullname}
          />}
          {!station.createdBy.imgUrl &&
            <div className='station-none-image'>
             <svg data-encore-id="icon" role="img" aria-hidden="true" data-testid="playlist" class="Svg-sc-ytk21e-0 bneLcE" viewBox="0 0 24 24"><path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z"></path></svg>
            </div>

          }
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
          {station.songs[0] && <div className='table-header'>
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
          {!station.songs[0] && <h1 className='header-input'>Let's find something for your playlist
            </h1>}
          <SongList songs={station.songs} onClickPlay={onClickPlay} onAddTo={onAddTo} />
          {!station.songs[0] && <form className='search-details' action=''>
            <label htmlFor=''><SearchIcon className /></label>
            <input onChange={handleChange} value={search ? search : ''} placeholder='Search for songs' type='text' />
          </form>}
          <section className='station-details' >
            {search && songs.map(song => <SearchPreview key={song.videoId} song={song} />)}

          </section>
          <MoreModal />
        </section>
        <AppFooter />
      </div>
    </React.Fragment>
  )
}
