import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addToLikedSongs } from '../store/actions/station.actions'

import AddIcon from '../assets/icons/addsong.svg?react'

export function SongOptionsModal({ song, onClose, buttonRef }) {
  const dispatch = useDispatch()
  const modalRef = useRef(null) // Ref for the modal

  useEffect(() => {
    if (buttonRef && modalRef.current) {
      // Get the position of the button that opened the modal
      const buttonRect = buttonRef.getBoundingClientRect()
      const modalWidth = modalRef.current.offsetWidth
      const windowWidth = window.innerWidth

      // Check if the modal goes beyond the viewport
      if (buttonRect.left + buttonRect.width + modalWidth > windowWidth) {
        // Position the modal to the left of the button
        modalRef.current.style.left = `${buttonRect.left - modalWidth - 10}px`
      } else {
        // Position the modal to the right of the button
        modalRef.current.style.left = `${
          buttonRect.left + buttonRect.width + 10
        }px`
      }
      modalRef.current.style.top = `${buttonRect.top + window.scrollY}px`
    }
  }, [buttonRef])

  const handleAddToLikedSongs = async () => {
    try {
      await dispatch(addToLikedSongs(song))
      onClose()
    } catch (err) {
      console.error('Failed to add song to liked songs', err)
    }
  }

  return (
    <div ref={modalRef} className='song-options-modal'>
      <div className='modal-content'>
        <button className='close-button' onClick={onClose}>
          {/* ⨂ */}
        </button>
        <button className='option-button' onClick={handleAddToLikedSongs}>
          <AddIcon className='add-button' />
          Save to your Liked Songs
        </button>
      </div>
    </div>
  )
}
