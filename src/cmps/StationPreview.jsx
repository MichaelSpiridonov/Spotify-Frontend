import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import playlistDefaultImage from '../assets/icons/myplaylist.svg'
import { MoreModal } from './modals/MoreModal'
import { StationModal } from './modals/StationModal'
import { setCurrSelectedStation } from '../store/actions/station.actions'
import { useSelector } from 'react-redux'

export function StationPreview({ station }) {
  if(!station.tags) return
  const currStation = useSelector((storeState) => storeState.stationModule.currSelectedStation)
  const element = document.querySelector('.station-list')
  var count = 0
  function handleContextMenu(event) {
    if(element) {
      // Prevent the default context menu from appearing
    event.preventDefault();
    // Check if the right mouse button was clicked
    if (event.button === 2) {
      console.log(station._id)
      setCurrSelectedStation(station._id)
      // Right-click was detected
      const x = event.clientX
      const y = event.clientY -230
      const elModal = document.querySelector('.station-modal')
      elModal.style.left = `${x}px`
      elModal.style.top = `${y}px`
      elModal.style.display = 'block'
      // You can add your own custom logic here
    }
    }
  };
  return (
  <>
    <Link to={`/station/${station._id}`}>
      <div id={station.name} className='station-preview' role='button' onContextMenu={handleContextMenu}>
        <img
          src={station.createdBy.imgUrl || playlistDefaultImage}
          alt='Station'
          className='station-image'
        />
        <div className='station-details'>
          <p className='station-name'>{station.name}</p>
          <p className='station-createdby'>Playlist · {station.name}</p>
        </div>
      </div>
    </Link>
    </>
  )
}
