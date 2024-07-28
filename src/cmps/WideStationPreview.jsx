import { Link } from 'react-router-dom'
import Play from '../assets/icons/play.svg?react';
export function WideStationPreview({ station }) {
  return (
    <Link to={`/station/${station._id}`}>
      <article className='wide-station-preview'>
        <img src={station.imgUrl} alt={station.name} />
        <h1>{station.name}</h1>
        <button>
          <Play className='play' />
        </button>
      </article>
    </Link>
  )
}
