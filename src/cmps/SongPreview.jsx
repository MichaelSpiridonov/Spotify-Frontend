import { formatDate, formatDuration } from '../services/util.service'
import PlayIcon from '../assets/icons/play.svg?react'
import PauseIcon from '../assets/icons/pause.svg?react'
import AddIcon from '../assets/icons/addsong.svg?react'
import LikeIcon from '../assets/icons/likedsong.svg?react'
import SongOptionsIcon from '../assets/icons/options_1.svg?react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useLayoutEffect, useState } from 'react'
import { ArtistCmp } from './ArtistCmp'

export function SongPreview({ song, onAddTo, onClickPlay, albumImg }) {
  const isPlaying = useSelector((storeState) => storeState.stationModule.isPlaying)
  const user = useSelector((storeState) => storeState.userModule.user)
  const currSong = useSelector((storeState) => storeState.stationModule.currSong)
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
  function onClickPlayPhone(song) {
    if (pageWidth > 500) return
    else {
      onClickPlay(song)
    }
  }
  return (
    <>
      <div className='play-button' >
        {(currSong?._id === song?._id && currSong && isPlaying) ? <PauseIcon /> : <PlayIcon onClick={() => onClickPlay(song)} />}
      </div>
      <img className='song-image' src={song.imgUrl ? song.imgUrl : albumImg} alt={song.title} />
      <section>
        <span onClick={() => onClickPlayPhone(song)} className='station-song-detail'>{song.title || song.name}</span>
        <section className='artists'>
        <ArtistCmp artists={song.artists}/>
        </section>
      </section>
      {song.imgUrl && <span className='song-album'>
        <Link to={`/album/${song.albumId}`}>{song.albumName}</Link>
      </span>}
      {(song.addedAt) ? <span className='song-date'>{formatDate(song.addedAt)}</span> : ''}
      <div className={`add-button ${(song.likedBy?.find(likeUser => likeUser._id === user?._id)) ? 'like-icn' : ''}`}>
        {(song.likedBy?.find(likeUser => likeUser._id === user?._id)) ? <LikeIcon /> : <AddIcon />}
      </div>
      <span className={song.imgUrl?'song-length': 'album-song-length'}>{formatDuration(song.duration || song.duration_ms)}</span>
      <div
        className='options-button'
        onClick={(event) => onAddTo(event, song)}
      >
        <SongOptionsIcon />
      </div>
    </>
  )
}
