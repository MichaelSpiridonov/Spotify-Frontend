import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import playlistDefaultImage from '../assets/icons/myplaylist.svg'
import { MoreModal } from './modals/MoreModal'
import { StationModal } from './modals/StationModal'

export function StationPreview({ station }) {
  const [currStation,setCurrStation] = useState(null)
  const element = document.querySelector('.station-list')
  var count = 0
  if (element) {
    element.addEventListener('contextmenu', function (event) {
      // Prevent the default context menu from appearing
      event.preventDefault();

      // Check if the right mouse button was clicked
      if (event.button === 2) {
        // Right-click was detected
        
        const x = event.clientX
        const y = event.clientY -230
        const elModal = document.querySelector('.station-modal')
        elModal.style.left = `${x}px`
        elModal.style.top = `${y}px`
        elModal.style.display = 'block'
        // You can add your own custom logic here
      }
    });
  }
  
  function clickOutsideListener(event) {
    const elModal = document.querySelector('.station-modal')
    count++
    if (!elModal) return
    if (!elModal.contains(event.target) && count == 1) {
      count = 0
      // Click outside the target element 
      elModal.style.display = 'none'
      // Do something here, such as closing a modal, hiding a dropdown, etc.
    }
  }
  document.addEventListener('click', clickOutsideListener);
  if(!station.tags) return
  return (
    <Link to={`/station/${station._id}`}>
      <div id={station.name} className='station-preview' role='button'>
        <img
          src={station.createdBy.imgUrl || playlistDefaultImage}
          alt='Station'
          className='station-image'
        />
        <div className='station-details'>
          <p className='station-name'>{station.name}</p>
          <p className='station-createdby'>Playlist {station.name}</p>
        </div>
        <StationModal station={currStation} />
      </div>
    </Link>
  )
}
