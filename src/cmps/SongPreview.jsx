import { formatDate, formatDuration } from '../services/util.service'
import PlayIcon from '../assets/icons/play.svg?react'
import AddIcon from '../assets/icons/addsong.svg?react'
import SongOptionsIcon from '../assets/icons/options_1.svg?react'
import { Link } from 'react-router-dom'

export function SongPreview({ song, onAddTo, onClickPlay }) {
  return (
    <>
      <div className='play-button' onClick={() => onClickPlay(song)}>
        <PlayIcon />
      </div>
      <img className='song-image' src={song.imgUrl} alt={song.title} />
      <section>
        <span className='station-song-detail'>{song.title}</span>
        {song.artists.map((artist, index) => (
          <span key={artist.id}>
            <Link to={`/artist/${artist.id}`} className='song-artist'>
              {artist.name}
            </Link>
            {index < song.artists.length - 1 && ', '}
          </span>
        ))}
      </section>
      <span className='song-album'>
        <Link to={`/album/${song._id}`}>{song.albumName}</Link>
      </span>
      <span className='song-date'>{formatDate(song.addedAt)}</span>
      <div className='add-button'>
        <AddIcon />
      </div>
      <span className='song-length'>{formatDuration(song.duration)}</span>
      <div
        className='options-button'
        onClick={(event) => onAddTo(event, song, station)}
      >
        <SongOptionsIcon />
      </div>
    </>
  )
}
