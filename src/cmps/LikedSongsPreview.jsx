import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export  function LikeSongsPreview() {
    const likedSongs = useSelector(storeState => storeState.stationModule.likedSongs)
    console.log(likedSongs)
    return <Link to={`/likedSongs`}>
        <div className='station-preview' role='button'>
            <img
                src='https://misc.scdn.co/liked-songs/liked-songs-64.png'
                alt='likedSongs'
                className='station-image'
            />
            <div className='station-details'>
                <p className='station-name'>{likedSongs.name}</p>
                <p className='station-createdby'>Playlist </p>
            </div>
        </div>
    </Link>


}