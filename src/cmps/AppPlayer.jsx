import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { loadStation } from "../store/actions/station.actions";
import { showErrorMsg } from '../services/event-bus.service';
import AddIcon from '../assets/icons/addsong.svg?react'
import Player from './Player.jsx';


export function AppPlayer() {
    const station = useSelector((storeState) => storeState.stationModule.station)

    useEffect(() => {
        loadStation('5cksxjas89xjsa8xjsa8jxs09')
            .catch(err => {
                showErrorMsg('Cannot load station!')
                throw err
            })
    }, [])

    console.log(station)
  if (!station) return <div>Loading...</div>
  return (
    <section className="app-player">
      <section className="song-detail">
        <img className="song-image" src={station.songs[1].imgUrl} />
        <section className='song-info'>
        <h2 className='song-title'>{station.songs[1].title}</h2>
        <h1 className='artist'>{station.songs[1].title}</h1>
        </section>
        <AddIcon className="add-icn"/>
    </section>
      <Player videoId="A4pasf5ci8s" />
    </section>
  )
}
