import React, { Component } from 'react'
import YouTube from 'react-youtube'
import ProgressBar from './ProgressBar'
import Play from '../assets/icons/play.svg?react'
import Pause from '../assets/icons/pause.svg?react'
import Shuffle from '../assets/icons/shuffle.svg?react'
import Previous from '../assets/icons/previous.svg?react'
import Next from '../assets/icons/next.svg?react'
import Repeat from '../assets/icons/repeatlist.svg?react'
import NowPlaying from '../assets/icons/nowplaying.svg?react'
import Queue from '../assets/icons/queue.svg?react'
import VolumeMin from '../assets/icons/volume.svg?react'
import VolumeMuted from '../assets/icons/volumemute.svg?react'
import VolumeMedium from '../assets/icons/volumedown.svg?react'
import VolumeMax from '../assets/icons/volumemax.svg?react'
import RepeatSong from '../assets/icons/repeatsong.svg?react'
import { updateSong } from '../store/actions/station.actions.js'

class Player extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isPlaying: false,
      player: null,
      isRepeat: false,
      isRepeatSong: false,
      isShuffle: false,
      volume: 25,
      currentTime: 0,
      duration: 0,
      isMuted: false,
      previousVolume: 25,
      shuffledSongs: [],
      currentIndex: 0,
    }
    this.onReady = this.onReady.bind(this)
    this.onStateChange = this.onStateChange.bind(this)
    this.handleVolumeChange = this.handleVolumeChange.bind(this)
    this.toggleRepeat = this.toggleRepeat.bind(this)
    this.toggleShuffle = this.toggleShuffle.bind(this)
    this.togglePlayPause = this.togglePlayPause.bind(this)
    this.handleSeek = this.handleSeek.bind(this)
    this.updateTime = this.updateTime.bind(this)
    this.onPlayNext = this.onPlayNext.bind(this)
    this.onPlayPrevious = this.onPlayPrevious.bind(this)
    this.toggleMute = this.toggleMute.bind(this)
    this.interval = null
  }

  onReady(event) {
    this.setState({
      player: event.target,
      duration: event.target.getDuration(),
    })
    event.target.setVolume(this.state.volume)
  }

  async onStateChange(event) {
    const { player, isRepeat, isRepeatSong } = this.state
    if (isRepeat && event.data === window.YT.PlayerState.ENDED) {
      this.onPlayNext()
      setTimeout(() => {
        player.playVideo()
      }, 1000)
    } else if (isRepeatSong && event.data === window.YT.PlayerState.ENDED) {
      setTimeout(() => {
        player.playVideo()
      }, 1000)
    } else if (event.data === window.YT.PlayerState.ENDED) {
      this.onPlayNext()
      this.setState({
        isPlaying: false,
        currentTime: 0,
        duration: player.getDuration(),
      })
    } else if (event.data !== window.YT.PlayerState.PAUSED) {
      player.playVideo()
      this.setState({
        isPlaying: true,
      })
    }
    if (event.data === window.YT.PlayerState.PLAYING) {
      this.startProgressUpdate()
    } else {
      this.stopProgressUpdate()
    }
  }

  startProgressUpdate() {
    const update = () => {
      this.updateTime()
      this.interval = requestAnimationFrame(update)
    }
    update()
  }

  stopProgressUpdate() {
    if (this.interval) {
      cancelAnimationFrame(this.interval)
      this.interval = null
    }
  }

  componentDidMount() {
    this.startProgressUpdate()
  }

  componentWillUnmount() {
    this.stopProgressUpdate()
  }

  togglePlayPause() {
    const { player, isPlaying } = this.state
    if (isPlaying) {
      player.pauseVideo()
    } else {
      player.playVideo()
    }
    this.setState({
      isPlaying: !isPlaying,
    })
  }

  toggleRepeat() {
    const { isRepeat, isRepeatSong } = this.state
    if(!isRepeat && !isRepeatSong) {
      this.setState({
        isRepeat: !isRepeat,
      })
    } else if (isRepeat) {
      this.setState({
        isRepeat: !isRepeat,
        isRepeatSong: !isRepeatSong,
      })
    } else {
      this.setState({
        isRepeatSong: !isRepeatSong,
      })
    }
  }

  toggleShuffle() {
    const { isShuffle } = this.state
    this.setState({
      isShuffle: !isShuffle,
    })

    if(!isShuffle){
      const { station } = this.props
      const shuffledSongs = [...station.songs]
     for (let i = shuffledSongs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      [shuffledSongs[i], shuffledSongs[j]] = [shuffledSongs[j], shuffledSongs[i]]
    }
     this.setState({ shuffledSongs })
    }
  }

  handleVolumeChange(event) {
    const { player } = this.state
    const volume = +event.target.value
    if (player) {
      player.setVolume(volume)
    }
    this.setState({
      volume: volume,
    })
    document.querySelector('.volume-slider').style.setProperty('--volume', `${volume}%`)
  }

  toggleMute() {
    const { player, isMuted, previousVolume } = this.state
    if (isMuted) {
      player.setVolume(previousVolume)
      this.setState({
        isMuted: false,
        volume: previousVolume,
      })
    } else {
      player.setVolume(0)
      this.setState({
        isMuted: true,
        volume: 0,
      })
    }
  }

  handleSeek(time) {
    const { player } = this.state
    if (player) {
      player.seekTo(time)
      this.setState({
        currentTime: time,
      })
    }
  }

  updateTime() {
    const { player } = this.state
    if (player) {
      const currentTime = player.getCurrentTime()
      const duration = player.getDuration()
      if (duration > 0) {
        const progressPercentage = (currentTime / duration) * 100
        this.setState({ currentTime })
        const progressBar = document.querySelector('.progress-bar')
        if (progressBar) {
          progressBar.style.setProperty('--progress', `${progressPercentage}%`)
        }
      }
    }
  }

  onPlayNext() {
    const { player, isRepeat, isShuffle, isPlaying, shuffledSongs, isRepeatSong } = this.state
    const { station, currSong } = this.props
    const songs = isShuffle ? shuffledSongs : station.songs
    let nextSongIdx = songs.findIndex((song) => song.id === currSong.id) + 1
    if (songs[nextSongIdx] && !isRepeatSong) {
      const nextSong = songs[nextSongIdx]
      updateSong(nextSong)
      this.playVideoWhenReady(player);
    } else if (!songs[nextSongIdx] && isRepeat || isShuffle) {
      nextSongIdx = 0
      const nextSong = songs[nextSongIdx]
      updateSong(nextSong)
    } else if (isRepeatSong){
      player.playVideo()
    }else {
      return
    }
    this.playVideoWhenReady(player);
  }

  onPlayPrevious() {
    const { player, isShuffle, shuffledSongs } = this.state
    const { station, currSong } = this.props
    const songs = isShuffle ? shuffledSongs : station.songs
    let previousSongIdx = songs.findIndex((song) => song.id === currSong.id) - 1
    if (songs[previousSongIdx]) {
      const previousSong = songs[previousSongIdx]
      updateSong(previousSong)
    } else {
      previousSongIdx = songs.length - 1
      const previousSong = songs[previousSongIdx]
      updateSong(previousSong)
    }
    this.playVideoWhenReady(player);
  }

  playVideoWhenReady(player) {
    if (player && player.playVideo) {
      player.playVideo();
    } else {
      setTimeout(() => this.playVideoWhenReady(player), 100);
    }
  }

  render() {
    const opts = {
      height: '0',
      width: '0',
      playerVars: {
        autoplay: 0,
        controls: 0,
      },
    }
    const { videoId } = this.props
    const { isPlaying, volume, currentTime, duration, isRepeat, isShuffle, previousVolume, isRepeatSong } = this.state

    return (
      <>
        <section className="player-seek-and-control">
          <section className="player-controls">
            <span className={isShuffle ? 'clicked' : ''}><Shuffle onClick={this.toggleShuffle} /></span>
            <Previous onClick={this.onPlayPrevious} />
            <section className="player">
              <YouTube
                className="video-player"
                videoId={videoId}
                opts={opts}
                onReady={this.onReady}
                onStateChange={this.onStateChange}
              />
              {isPlaying ? (
                <Pause onClick={this.togglePlayPause} />
              ) : (
                <Play onClick={this.togglePlayPause} />
              )}
            </section>
            <Next onClick={this.onPlayNext} />
            <span className={isRepeat || isRepeatSong ? 'clicked' : ''}>{!isRepeatSong && !isRepeat ? <Repeat onClick={this.toggleRepeat} /> : ''}{isRepeat ? <Repeat onClick={this.toggleRepeat}/> : ''}{isRepeatSong ? <RepeatSong onClick={this.toggleRepeat} /> : ''}</span>
          </section>
          <ProgressBar currentTime={currentTime} duration={duration} onSeek={this.handleSeek} />
        </section>
        <section className="player-controls">
          <NowPlaying />
          <Queue />
          {volume === 0 || this.state.isMuted ? (
              <VolumeMuted />
            ) : volume < 30 ? (
              <VolumeMin />
            ) : volume < 70 ? (
              <VolumeMedium />
            ) : (
              <VolumeMax />
            )}
          <div className="volume-slider-container">
            <input
              type="range"
              min="0"
              max="100"
              value={previousVolume || volume || 25}
              step="1"
              onChange={this.handleVolumeChange}
              className="volume-slider"
              style={{ '--volume': `${volume}%` }}
            />
          </div>
        </section>
      </>
    )
  }
}

export default Player
