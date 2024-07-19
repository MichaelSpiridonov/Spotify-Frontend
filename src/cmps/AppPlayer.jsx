import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { loadStation } from "../store/actions/station.actions";
import { showErrorMsg } from '../services/event-bus.service';
import AddIcon from '../assets/icons/addsong.svg?react'
import Player from './Player.jsx';


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
 
  if (!station) return <div>Loading...</div>
  return (
    <section className="app-player">
      <section>
     {currSong && <section className="song-detail">
        <img className="song-image" src={currSong.imgUrl} />
        <section className='song-info'>
        <h2 className='song-title'>{currSong.title}</h2>
        {/* <h1 className='artist'>{currSong.title}</h1> */}
        </section>
        <AddIcon className="add-icn"/>
    </section>}</section>
      <Player videoId={(currSong !== null) ? currSong.id : ''} />
    </section>
  )
}
