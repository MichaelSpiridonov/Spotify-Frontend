import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export  function LikeSongsPreview() {
    const likedSongs = useSelector(storeState => storeState.stationModule.likedSongs)
    console.log(likedSongs)
    return <Link to={`/likedSongs`}>
        <div className='liked-preview' role='button'>
            <img
                src='https://misc.scdn.co/liked-songs/liked-songs-64.png'
                alt='likedSongs'
                className='liked-image'
            />
            <div className='liked-details'>
                <p className='liked-name'>{likedSongs.name}</p>
                <p className='liked-createdby'>Playlist </p>
            </div>
        </div>
    </Link>


}