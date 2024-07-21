import React from 'react'
import { Link } from 'react-router-dom'

import playlistDefaultImage from '../assets/icons/myplaylist.svg'

export function StationPreview({ station }) {
  console.log(station)
  return (
    <Link to={`/station/${station._id}`}>
      <div className='station-preview' role='button'>
        <img
          src={station.createdBy.imgUrl || playlistDefaultImage}
          alt='Station'
          className='station-image'
        />
        <div className='station-details'>
          <p className='station-name'>{station.name}</p>
          <p className='station-createdby'>Playlist {station.createdBy.fullname}</p>
        </div>
      </div>
    </Link>
  )
}
