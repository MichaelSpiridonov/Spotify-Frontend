import { Link } from "react-router-dom";

export function ArtistCmp({ artists }) {
  console.log(artists)
    return (
        <>
        {artists.map((artist, index) => (
            <span key={artist.id}>
                    <Link to={`/artist/${artist.id}`} className="artist-name">
                      {artist.name}
                    </Link>
                    {index < artists.length - 1 && ", "}
                  </span>
          ))}
        </>
    )
} 