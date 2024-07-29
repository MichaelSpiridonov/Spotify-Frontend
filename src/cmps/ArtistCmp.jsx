import { Link } from "react-router-dom"

export function ArtistCmp({ artists }) {
  return (
    <>
      {artists.map((artist, index) => (
        <span key={artist.id}>
          <div /* Link to={`/artist/${artist.id}`}  */ className="artist-name">
            {(index < artists.length- 1?artist.name + ',' : artist.name) }
          </div> 
        </span>
      ))}
    </>
  )
}
