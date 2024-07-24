

export function ArtistCmp({ artist }) {
    console.log(artist)
    return <Link to={`artist/${artist.id}`} className='artist-name'>{artist.name}</Link>
} 