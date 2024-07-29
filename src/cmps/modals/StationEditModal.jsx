import React, { useState } from 'react'
import ChooseImageIcon from '../../assets/icons/chooseimage.svg?react'
import NewPlaylist from '../../assets/icons/newplaylist.svg?react'
import { uploadService } from '../../services/upload.service.js'
import {
  setCurrStation,
  updateStation,
} from '../../store/actions/station.actions'
import { useSelector } from 'react-redux'

export function StationEditModal({ onClose }) {
  const station = useSelector((storeState) => storeState.stationModule.currSelectedStation)
  const [name, setName] = useState(station.name)
  const [description, setDescription] = useState(station.description)
  const [imgUrl, setImgUrl] = useState(station.imgUrl || NewPlaylist)
  const [isNameFocused, setIsNameFocused] = useState(false)
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false)

  // Event handler to open file browser
  const handleChooseImage = () => {
    document.getElementById('fileInput').click()
  }

  // Event handler for file selection and upload
  const handleFileChange = async (ev) => {
    try {
      const imgData = await uploadService.uploadImg(ev)
      setImgUrl(imgData.secure_url)
    } catch (err) {
      console.error('Failed to upload image', err)
    }
  }

  const handleSave = () => {
    const updatedStation = {
      ...station,
      name,
      description,
      imgUrl,
      createdBy: { ...station.createdBy, imgUrl },
    }
    updateStation(updatedStation)
    setCurrStation(updatedStation)
    onClose()
  }

  return (
    <div className='edit-modal-backdrop'>
      <dialog open className='station-edit-modal'>
        <button className='close-button' onClick={onClose}>
          ⨉
        </button>{' '}
        <h2>Edit details</h2>
        <div className='modal-content'>
          <div className='image-container'>
            <img src={imgUrl} alt='Station Cover' className='station-image' />
            <div className='choose-image' onClick={handleChooseImage}>
              <ChooseImageIcon />
              {/* Hidden file input */}
              <input
                type='file'
                id='fileInput'
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className='details-container'>
            <div className={`input-wrapper ${isNameFocused ? 'focused' : ''}`}>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setIsNameFocused(true)}
                onBlur={() => setIsNameFocused(false)}
                placeholder='My Playlist'
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
                onChange={(e) => setDescription(e.target.value)}
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
          <p>
            By proceeding, you agree to give Spotify access to the image you
            choose to upload. Please make sure you have the right to upload the
            image.
          </p>{' '}
        </div>
      </dialog>
    </div>
  )
}
