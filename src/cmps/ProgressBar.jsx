import { useState, useEffect } from 'react'
import { formatTime } from '../services/util.service'

export function ProgressBar({ currentTime, duration, onSeek }) {
  const [isSeeking, setIsSeeking] = useState(false)
  const [seekValue, setSeekValue] = useState(0)

  useEffect(() => {
    if (!isSeeking) {
      const progressPercentage = (currentTime / duration) * 100
      setSeekValue(progressPercentage)
    }
  }, [currentTime, duration, isSeeking])

  const handleSeek = (event) => {
    const value = parseFloat(event.target.value)
    setSeekValue(value)
    const seekTime = (value / 100) * duration
    onSeek(seekTime)
  }

  const handleMouseDown = () => {
    setIsSeeking(true)
  }

  const handleMouseUp = (event) => {
    setIsSeeking(false)
    const value = parseFloat(event.target.value)
    const seekTime = (value / 100) * duration
    onSeek(seekTime)
  }

  return (
    <div className='progress-bar-container'>
      <span className='time'>{formatTime(currentTime)}</span>
      <input
        type='range'
        min='0'
        max='100'
        step='0.1'
        value={seekValue || 0}
        onChange={handleSeek}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className='progress-bar'
        style={{ '--progress': `${seekValue}%` }}
      />
      <span className='time'>{formatTime(duration)}</span>
    </div>
  )
}
