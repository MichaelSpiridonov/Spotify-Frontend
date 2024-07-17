import React from 'react'
import playlistDefaultImage from '../assets/icons/myplaylist.svg'

export function StationPreview({ station }) {
  return (
    <div className='station-preview' role='button'>
      <img src={playlistDefaultImage} alt='Station' className='station-image' />
      <div className='station-details'>
        <p className='station-name'>{station.name}</p>
        <p className='station-createdby'>{station.createdBy.fullname}</p>
      </div>
    </div>
  )
}
