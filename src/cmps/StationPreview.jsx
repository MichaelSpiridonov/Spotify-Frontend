import React from 'react'

export function StationPreview({ station }) {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
  }
console.log(station)
  return (
    <ul className='StationPreview'>
      {station.songs.map((song) => (
        <li key={song.id}>
          <button>▶</button>
          <img src={song.imgUrl} alt={song.title} />
          <span>{song.title}</span>
          <span></span> {/* Placeholder for song album */}
          <span>{formatDate(song.addedAt)}</span>
          <button>+</button>
          <span>0:00</span> {/* Placeholder for song length */}
        </li>
      ))}
    </ul>
  )
}
