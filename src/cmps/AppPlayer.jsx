import { useSelector } from 'react-redux'
import AddIcon from '../assets/icons/addsong.svg?react'
import Player from './Player.jsx';
import { Link } from 'react-router-dom';


export function AppPlayer() {
    const station = useSelector((storeState) => storeState.stationModule.station)
    const currSong = useSelector((storeState) => storeState.stationModule.currSong)

    /* useEffect(() => {
        /* loadStation('5cksxjas89xjsa8xjsa8jxs09') */
            //.catch(err => {
          //      showErrorMsg('Cannot load station!')
        //        throw err
      //      })
    //}, [])
 
  /* if (!station) return  */
  return (
    <section className="app-player">
      <section>
     {currSong && <section className="song-detail">
        <img className="song-image" src={currSong.imgUrl} />
        <section className='song-info'>
        <Link to={`album/:albumId`} className='song-title'>{currSong.title.replace(/^.*?-/, '')}</Link>
        <Link to={`artist/${currSong.title.replace(/-.*$/, '')}`} className='artist-name'>{currSong.title.replace(/-.*$/, '')}</Link>
        </section>
        <AddIcon className="add-icn"/>
    </section>}</section>
      <Player videoId={(currSong !== null) ? currSong.id : ''} currSong={currSong} station={station} />
    </section>
  )
}
