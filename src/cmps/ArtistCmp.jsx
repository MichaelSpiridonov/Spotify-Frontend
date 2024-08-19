export function ArtistCmp({ artists }) {
  return (
    <>
      {artists.map((artist, index) => (
        <span key={artist.id}>
          <div className='artist-name'>
            {artist.name}
            {index < artists.length - 1 ? ',' : ''}
          </div>
        </span>
      ))}
    </>
  )
}
