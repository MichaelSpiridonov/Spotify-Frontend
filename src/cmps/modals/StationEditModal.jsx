import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateStations } from '../../store/actions/station.actions'
import ChooseImageIcon from '../../assets/icons/chooseimage.svg?react'

export function StationEditModal({ station, onClose }) {
  const [name, setName] = useState(station?.name || '')
  const [description, setDescription] = useState(station?.description || '')
  const dispatch = useDispatch()

  const handleSave = () => {
    const updatedStation = { ...station, name, description }
    dispatch(updateStations(updatedStation))
    onClose()
  }

  return (
    <div className='station-edit-modal'>
      <div className='modal-content'>
        <div className='modal-image'>
          <img src={station.imgUrl} alt={station.name} />
          <div className='choose-image'>
            <ChooseImageIcon />
          </div>
        </div>
        <div className='modal-info'>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Station Name'
            className='station-name'
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Description'
            className='station-description'
          />
          <button onClick={handleSave} className='save-button'>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
