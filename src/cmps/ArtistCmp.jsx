import { Link } from "react-router-dom"

export function ArtistCmp({ artists }) {
  console.log(artists)
  return (
    <>
      {artists.map((artist, index) => (
        <span key={artist.id}>
          <div /* Link to={`/artist/${artist.id}`}  */ className="artist-name">
          {artist.name}
            {(index < artists.length-1? ',' : '') }
          </div> 
        </span>
      ))}
    </>
  )
}
