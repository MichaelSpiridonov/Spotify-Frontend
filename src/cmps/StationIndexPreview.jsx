import { Link } from 'react-router-dom';
import Play from '../assets/icons/play.svg?react';
export function StationIndexPreview({ station }) {
    if (station.tags) {
        return
    }
    return (
    <Link to={`/station/${station._id}`}>
        <article className='home-station-preview'>
            <img src={station.imgUrl} alt='' />
            <h1>{station.name}</h1>
            <button>
                <Play className='play' />
            </button>
        </article>
    </Link>
    )

}