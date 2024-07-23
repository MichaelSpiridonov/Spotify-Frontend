import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addToLikedSongs } from '../../store/actions/station.actions'



export function SongOptionsModal({ song, onClose, buttonRef }) {
  const dispatch = useDispatch()
  const modalRef = useRef(null) // Ref for the modal

  useEffect(() => {
    if (buttonRef && modalRef.current) {
      const buttonRect = buttonRef.getBoundingClientRect()
      const modalWidth = modalRef.current.offsetWidth
      const windowWidth = window.innerWidth

      if (buttonRect.left + buttonRect.width + modalWidth > windowWidth) {
        modalRef.current.style.left = `${buttonRect.left - modalWidth - 10}px`
      } else {
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
      <ul className='modal-content'>
        <li className='option-button' onClick={handleAddToLikedSongs}>
          {/* <AddIcon className='add-button' /> */}
          Save to your Liked Songs
        </li>
        <li className='option-button' onClick={onClose}>
          Close
        </li>
      </ul>
    </div>
  )
}
