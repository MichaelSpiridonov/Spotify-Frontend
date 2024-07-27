import React, { useState } from 'react'
import ChooseImageIcon from '../../assets/icons/chooseimage.svg?react'
import NewPlaylist from '../../assets/icons/newplaylist.svg?react'
import { setCurrStation, updateStation } from '../../store/actions/station.actions'

export function StationEditModal({ station, onClose }) {
  const [name, setName] = useState(station.name) // State for station name
  const [description, setDescription] = useState(station.description) // State for station description
  const [isNameFocused, setIsNameFocused] = useState(false) // State for name input focus
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false) // State for description input focus

  const handleSave = () => {
    const updatedStation = { ...station, name, description } // Update station with new name and description
    updateStation(updatedStation) // Call action to update station
    setCurrStation(updatedStation)
    onClose() // Close modal after saving
  }

  return (
    <div className='edit-modal-backdrop'>
      <dialog open className='station-edit-modal'>
        <button className='close-button' onClick={onClose}>
          ⨉
        </button>{' '}
        {/* Close button for modal */}
        <h2>Edit details</h2>
        <div className='modal-content'>
          <div className='image-container'>
            <img
              src={station.createdBy.imgUrl || NewPlaylist} // Display station image or default image
              alt='Station Cover'
              className='station-image'
            />
            <div className='choose-image'>
              <ChooseImageIcon /> {/* Icon to choose a new image */}
            </div>
          </div>
          <div className='details-container'>
            <div className={`input-wrapper ${isNameFocused ? 'focused' : ''}`}>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)} // Update name state on change
                onFocus={() => setIsNameFocused(true)}
                onBlur={() => setIsNameFocused(false)}
                placeholder='My Playlist #7'
              />
              <label>Name</label>
            </div>
            <div
              className={`input-wrapper ${
                isDescriptionFocused ? 'focused' : ''
              }`}
            >
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)} // Update description state on change
                onFocus={() => setIsDescriptionFocused(true)}
                onBlur={() => setIsDescriptionFocused(false)}
                placeholder='Add an optional description'
              />
              <label>Description</label>
            </div>
          </div>
        </div>
        <div className='modal-footer'>
          <button className='save-button' onClick={handleSave}>
            Save
          </button>{' '}
          {/* Save button */}
          <p>
            By proceeding, you agree to give Spotify access to the image you
            choose to upload. Please make sure you have the right to upload the
            image.
          </p>{' '}
          {/* Disclaimer text */}
        </div>
      </dialog>
    </div>
  )
}
