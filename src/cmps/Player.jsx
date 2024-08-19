import { useState, useEffect, useRef } from 'react'
import YouTube from 'react-youtube'
import ProgressBar from './ProgressBar'
import Play from '../assets/icons/play.svg?react'
import Pause from '../assets/icons/pause.svg?react'
import Shuffle from '../assets/icons/shuffle.svg?react'
import Previous from '../assets/icons/previous.svg?react'
import Next from '../assets/icons/next.svg?react'
import Repeat from '../assets/icons/repeatlist.svg?react'
import VolumeMin from '../assets/icons/volume.svg?react'
import VolumeMuted from '../assets/icons/volumemute.svg?react'
import VolumeMedium from '../assets/icons/volumedown.svg?react'
import VolumeMax from '../assets/icons/volumemax.svg?react'
import RepeatSong from '../assets/icons/repeatsong.svg?react'
import { updateSong } from '../store/actions/station.actions.js'
import { youtubeService } from '../services/youtube'
import { Link } from 'react-router-dom'

export function Player(props) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [player, setPlayer] = useState(null)
  const [isRepeat, setIsRepeat] = useState(false)
  const [isRepeatSong, setIsRepeatSong] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)
  const [volume, setVolume] = useState(25)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [previousVolume, setPreviousVolume] = useState(25)
  const [shuffledSongs, setShuffledSongs] = useState([])

  const intervalRef = useRef(null)
  function onReady(event) {
    setPlayer(event.target)
    setDuration(event.target.getDuration())
    event.target.setVolume(volume)
    event.target.unMute();
  }

  async function onStateChange(event) {
    console.log('Player Props:', props)
    if (isRepeat && event.data === window.YT.PlayerState.ENDED) {
      onPlay('next')
      setTimeout(() => {
        player.playVideo()
      }, 1000)
    } else if (isRepeatSong && event.data === window.YT.PlayerState.ENDED) {
      setTimeout(() => {
        player.playVideo()
      }, 1000)
    } else if (event.data === window.YT.PlayerState.ENDED) {
      onPlay('next')
      setIsPlaying(false)
      setCurrentTime(0)
      setDuration(player.getDuration())
    } else if (event.data !== window.YT.PlayerState.PAUSED) {
      player.playVideo()
      setIsPlaying(true)
    }
    if (event.data === window.YT.PlayerState.PLAYING) {
      startProgressUpdate()
    } else {
      stopProgressUpdate()
    }
  }

  function startProgressUpdate() {
    const update = () => {
      updateTime()
      intervalRef.current = requestAnimationFrame(update)
    }
    update()
  }

  function stopProgressUpdate() {
    if (intervalRef.current) {
      cancelAnimationFrame(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => {
    startProgressUpdate()
    return () => stopProgressUpdate()
  })

  function togglePlayPause() {
    if (isPlaying) {
      player.pauseVideo()
    } else {
      player.playVideo()
    }
    setIsPlaying(!isPlaying)
  }

  function toggleRepeat() {
    if (!isRepeat && !isRepeatSong) {
      setIsRepeat(!isRepeat)
    } else if (isRepeat) {
      setIsRepeat(!isRepeat)
      setIsRepeatSong(!isRepeatSong)
    } else {
      setIsRepeatSong(!isRepeatSong)
    }
  }

  function toggleShuffle() {
    setIsShuffle(!isShuffle)

    if (!isShuffle) {
      const shuffledSongs = [...props.station.songs]
      for (let i = shuffledSongs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffledSongs[i], shuffledSongs[j]] = [
          shuffledSongs[j],
          shuffledSongs[i],
        ]
      }
      setShuffledSongs(shuffledSongs)
    }
  }

  function handleVolumeChange(event) {
    const newVolume = +event.target.value
    if (player) {
      player.setVolume(newVolume)
    }
    setVolume(newVolume)
    document
      .querySelector('.volume-slider')
      .style.setProperty('--volume', `${newVolume}%`)
  }

  function toggleMute() {
    if (isMuted) {
      player.setVolume(previousVolume)
      setIsMuted(false)
      setVolume(previousVolume)
    } else {
      setPreviousVolume(volume)
      player.setVolume(0)
      setIsMuted(true)
      setVolume(0)
    }
  }

  function handleSeek(time) {
    if (player) {
      player.seekTo(time)
      setCurrentTime(time)
    }
  }

  function updateTime() {
    if (player) {
      const currentTime = player.getCurrentTime()
      const duration = player.getDuration()
      if (duration > 0) {
        const progressPercentage = (currentTime / duration) * 100
        setCurrentTime(currentTime)
        const progressBar = document.querySelector('.progress-bar')
        if (progressBar) {
          progressBar.style.setProperty('--progress', `${progressPercentage}%`)
        }
      }
    }
  }

  async function getVideoId(name) {
    const id = await youtubeService.getVideos(name)

    return id[0].videoId
  }

  async function onPlay(direction, event) {
    const { station, currSong } = props
    const songs = isShuffle ? shuffledSongs : station.songs
    let songIdx = songs.findIndex(
      (song) => song._id === currSong._id || song.id === currSong.id
    )

    if (direction === 'next') {
      songIdx++
      if (isRepeatSong && event?.type === 'click') {
        setIsRepeatSong(false)
        setIsRepeat(true)
      }
    } else if (direction === 'previous') {
      songIdx--
    }

    if (songs[songIdx]) {
      const song = songs[songIdx]
      const id = await getVideoId(song.title)
      song.id = id
      updateSong(song)
    } else if (
      direction === 'next' &&
      (isRepeat || isShuffle || isPlaying || event?.type === 'click')
    ) {
      songIdx = 0
      const song = songs[songIdx]
      const id = await getVideoId(song.title)
      song.id = id
      updateSong(song)
    } else if (direction === 'previous') {
      songIdx = songs.length - 1
      const song = songs[songIdx]
      const id = await getVideoId(song.title)
      song.id = id
      updateSong(song)
    } else if (isRepeatSong) {
      player.playVideo()
    } else {
      return
    }
  }

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 0,
      controls: 0,
      playsinline: 1,
    },
  }
  const { videoId } = props

  return (
    <>
      <section className='player-seek-and-control'>
        <section className='player-controls center'>
          <span className={`effects ${isShuffle ? 'clicked' : ''}`}>
            <Shuffle
              className='shuffel'
              onClick={toggleShuffle}
            />
          </span>
          <Previous
            className='previous-btn'
            onClick={(e) => onPlay('previous', e)}
          />
          <section className='player'>
            <YouTube
              className='video-player'
              videoId={videoId}
              opts={opts}
              onReady={onReady}
              onStateChange={onStateChange}
            />
            {isPlaying ? (
              <Pause onClick={togglePlayPause} />
            ) : (
              <Play onClick={togglePlayPause} />
            )}
          </section>
          <Next
            className='next-btn'
            onClick={(e) => onPlay('next', e)}
          />
          <span
            className={`effects ${isRepeat || isRepeatSong ? 'clicked' : ''}`}
          >
            {!isRepeatSong && !isRepeat ? (
              <Repeat
                className='reapet'
                onClick={toggleRepeat}
              />
            ) : (
              ''
            )}
            {isRepeat ? (
              <Repeat
                className='reapet'
                onClick={toggleRepeat}
              />
            ) : (
              ''
            )}
            {isRepeatSong ? (
              <RepeatSong
                className='reapet'
                onClick={toggleRepeat}
              />
            ) : (
              ''
            )}
          </span>
        </section>
        <ProgressBar
          className='progras-bar'
          currentTime={currentTime}
          duration={duration}
          onSeek={handleSeek}
        />
      </section>
      <section className='player-controls side'>
        <span className='lyrics-btn'>
          <Link to='/lyrics'>
            <svg
              data-encore-id='icon'
              role='img'
              aria-hidden='true'
              viewBox='0 0 16 16'
              className='Svg-sc-ytk21e-0 dYnaPI'
            >
              <path d='M13.426 2.574a2.831 2.831 0 0 0-4.797 1.55l3.247 3.247a2.831 2.831 0 0 0 1.55-4.797zM10.5 8.118l-2.619-2.62A63303.13 63303.13 0 0 0 4.74 9.075L2.065 12.12a1.287 1.287 0 0 0 1.816 1.816l3.06-2.688 3.56-3.129zM7.12 4.094a4.331 4.331 0 1 1 4.786 4.786l-3.974 3.493-3.06 2.689a2.787 2.787 0 0 1-3.933-3.933l2.676-3.045 3.505-3.99z'></path>
            </svg>
          </Link>
        </span>
        {volume === 0 || isMuted ? (
          <VolumeMuted onClick={toggleMute} />
        ) : volume < 30 ? (
          <VolumeMin onClick={toggleMute} />
        ) : volume < 70 ? (
          <VolumeMedium onClick={toggleMute} />
        ) : (
          <VolumeMax onClick={toggleMute} />
        )}
        <div className='volume-slider-container'>
          <input
            type='range'
            min='0'
            max='100'
            value={previousVolume || volume || 25}
            step='1'
            onChange={handleVolumeChange}
            className='volume-slider'
            style={{ '--volume': `${volume}%` }}
          />
        </div>
      </section>
    </>
  )
}

export default Player
