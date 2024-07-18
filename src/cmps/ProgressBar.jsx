import React from 'react';

const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

const ProgressBar = ({ currentTime, duration, onSeek }) => {
  const handleSeek = (event) => {
    const seekTime = (event.target.value / 100) * duration;
    onSeek(seekTime);
  };

  const progressPercentage = (currentTime / duration) * 100;

  return (
    <div className="progress-bar-container">
    <span className="time">{formatTime(currentTime)}</span>
      <input
        type="range"
        min="0"
        max="101"
        step="1"
        value={progressPercentage}
        onChange={handleSeek}
        className="progress-bar"
      />
      <span className="time">{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;