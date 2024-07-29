import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { setCurrSelectedStation } from '../store/actions/station.actions'
import { useSelector } from 'react-redux'

export function StationPreview({ station }) {
  const user = useSelector((storeState) => storeState.userModule.user)
  if (!station.likedByUsers?.some(likeUser => likeUser?._id === user?._id) && station.createdBy?._id !== user?._id) return;
  const element = document.querySelector('.station-list')
  function handleContextMenu(event) {
    if (element) {
      // Prevent the default context menu from appearing
      event.preventDefault();
      // Check if the right mouse button was clicked
      if (event.button === 2) {
        setCurrSelectedStation(station)
        // Right-click was detected
        const x = event.clientX
        const y = event.clientY - 230
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
          {station.imgUrl && <img
            className='station-image'
            src={station.imgUrl}
            alt={station.createdBy.fullname}
          />}
          {!station.imgUrl &&
            <div className='library-none-image'>
              <svg data-encore-id="icon" role="img" aria-hidden="true" data-testid="playlist" className="Svg-sc-ytk21e-0 bneLcE" viewBox="0 0 24 24"><path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z"></path></svg>
            </div>

          }
          <div className='station-details'>
            <p className='station-name'>{station.name}</p>
            <p className='station-createdby'>Playlist · {station.name}</p>
          </div>
        </div>
      </Link>
    </>
  )
}
