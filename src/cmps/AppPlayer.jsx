import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { loadStation } from "../store/actions/station.actions";
import Shuffle from '../assets/icons/shuffle.svg?react'
import Previous from '../assets/icons/previous.svg?react'
import Play from '../assets/icons/play.svg?react'
import Pause from '../assets/icons/pause.svg?react'
import Next from '../assets/icons/next.svg?react'
import Repeat from '../assets/icons/repeatlist.svg?react'

import NowPlaying from '../assets/icons/nowplaying.svg?react'
import Queue from '../assets/icons/queue.svg?react'

import { showErrorMsg } from '../services/event-bus.service';


export function AppPlayer() {
    const station = useSelector(storeState => storeState.stationModule.station)
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        loadStation('5cksxjas89xjsa8xjsa8jxs09')
            .catch(err => {
                showErrorMsg('Cannot load station!')
                throw err
            })
    }, [])
    console.log(station)

    function playPause() {
      setIsPlaying(!isPlaying)
    }

  return (
    <section className="app-player">
      <div className='song-image'>
        <img src={station.songs[0].url}/>
        </div>
      <section className="song-detail">
      <h1>{station.songs[0].title}</h1>
      <h2>{station.songs[0].title}</h2>
    </section>

      <section className="player-controls">
      <Shuffle />
      <Previous />
      <div className='player'>
      {(isPlaying ) ? <Play onClick={() => playPause()}/> : <Pause onClick={() => playPause()}/>}
      </div>
      <Next />
      <Repeat />
      </section>
      <section className="player-controls">
      <NowPlaying />
      <Queue />
      </section>
    </section>
  )
}
