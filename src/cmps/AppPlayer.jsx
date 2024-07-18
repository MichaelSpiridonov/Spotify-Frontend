import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { loadStation } from "../store/actions/station.actions";
import Shuffle from '../assets/icons/shuffle.svg?react'
import Previous from '../assets/icons/previous.svg?react'
import Next from '../assets/icons/next.svg?react'
import Repeat from '../assets/icons/repeatlist.svg?react'

import NowPlaying from '../assets/icons/nowplaying.svg?react'
import Queue from '../assets/icons/queue.svg?react'
import VolumeDown from '../assets/icons/volumedown.svg?react';
import VolumeUp from '../assets/icons/volumeup.svg?react';

import { showErrorMsg } from '../services/event-bus.service';
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
      <h1>{station.songs[1].title}</h1>
      <h2>{station.songs[1].title}</h2>
    </section>

      <section className="player-controls">
      <div className='control-btn'>
      <Shuffle />
      </div>
      <div className='control-btn'>
      <Previous />
      </div>
      <Player videoId={station.songs[1].id} />
      <div className='control-btn'>
      <Next />
      </div>
      <div className='control-btn'>
      <Repeat />
      </div>
      </section>
      <section className="player-controls">
      <div className='control-btn'>
      <NowPlaying />
      </div>
      <div className='control-btn'>
      <Queue />
      </div>
      <div className='control-btn'>
      <VolumeDown />
      </div>
      </section>
    </section>
  )
}
