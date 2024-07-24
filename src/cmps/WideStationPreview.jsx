import { Link } from 'react-router-dom'

export function WideStationPreview({ station }) {
  return (
    <Link to={`/station/${station._id}`}>
      <article className='wide-station-preview'>
        <img src={station.imgUrl} alt={station.name} />
        <h1>{station.name}</h1>
      </article>
    </Link>
  )
}
