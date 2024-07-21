import YouTube from 'react-youtube';
import React, { Component } from 'react';
import Play from '../assets/icons/play.svg?react';
import Pause from '../assets/icons/pause.svg?react';
import Shuffle from '../assets/icons/shuffle.svg?react';
import Previous from '../assets/icons/previous.svg?react';
import Next from '../assets/icons/next.svg?react';
import Repeat from '../assets/icons/repeatlist.svg?react';
import NowPlaying from '../assets/icons/nowplaying.svg?react';
import Queue from '../assets/icons/queue.svg?react';
import VolumeMin from '../assets/icons/volume.svg?react';
import VolumeMuted from '../assets/icons/volumemute.svg?react';
import VolumeMedium from '../assets/icons/volumedown.svg?react';
import VolumeMax from '../assets/icons/volumemax.svg?react';
import ProgressBar from './ProgressBar';
import { updateSong } from '../store/actions/station.actions.js';

class Player extends React.Component {
  constructor(props) { 
    console.log(props)
    super(props);
    this.state = {
      isPlaying: false,
      player: null,
      isRepeat: false,
      isShuffle: false,
      volume: 25,
      currentTime: 0,
      duration: 0,
      isMuted: false,
      previousVolume: 25,
    };
    this.onReady = this.onReady.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.toggleRepeat = this.toggleRepeat.bind(this)
    this.toggleShuffle = this.toggleShuffle.bind(this)
    this.togglePlayPause = this.togglePlayPause.bind(this);
    this.handleSeek = this.handleSeek.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.onPlayNext = this.onPlayNext.bind(this);
    this.onPlayPrevious = this.onPlayPrevious.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.interval = null;
  }

  onReady(event) {
    this.setState({
      player: event.target,
      duration: event.target.getDuration(),
    });
    event.target.setVolume(this.state.volume);
    event.target.playVideo();
  }

  async onStateChange(event) {
    const { player, isRepeat } = this.state;
    if (isRepeat && event.data === window.YT.PlayerState.ENDED) {
      this.onPlayNext();
      setTimeout(() => {
        player.playVideo();
      }, 1000);
    } else if (event.data === window.YT.PlayerState.ENDED) {
      this.onPlayNext();
      this.setState({
        isPlaying: false,
        currentTime: 0,
        duration: player.getDuration(),
      });
    } else if(event.data !== window.YT.PlayerState.PAUSED){
      player.playVideo();
      this.setState({
        isPlaying: true,
      });
    }
    if (event.data === window.YT.PlayerState.PLAYING) {
      this.startProgressUpdate();
    } else {
      this.stopProgressUpdate();
    }
  }

  startProgressUpdate() {
    const update = () => {
      this.updateTime();
      this.interval = requestAnimationFrame(update);
    };
    update();
  }
  
  stopProgressUpdate() {
    if (this.interval) {
      cancelAnimationFrame(this.interval);
      this.interval = null;
    }
  }
  
  componentDidMount() {
    this.startProgressUpdate();
  }
  
  componentWillUnmount() {
    this.stopProgressUpdate();
  }

  togglePlayPause() {
    const { player, isPlaying } = this.state;
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
    this.setState({
      isPlaying: !isPlaying,
    });
  }

  toggleRepeat() {
    const { isRepeat } = this.state;
    this.setState({
      isRepeat: !isRepeat,
    });
  }

  toggleShuffle() {
    const { isShuffle } = this.state;
    this.setState({
      isShuffle: !isShuffle,
    });
  }

  handleVolumeChange(event) {
    const { player } = this.state;
    const volume = +event.target.value;
    if (player) {
      player.setVolume(volume);
    }
    this.setState({
      volume: volume,
    });
    document.querySelector('.volume-slider').style.setProperty('--volume', `${volume}%`);
  }

  toggleMute() {
    const { player, isMuted, previousVolume } = this.state;
    if (isMuted) {
      player.setVolume(previousVolume);
      this.setState({
        isMuted: false,
        volume: previousVolume,
      });
    } else {
      player.setVolume(0);
      this.setState({
        isMuted: true,
        volume: 0,
      });
    }
  }

  handleSeek(time) {
    const { player } = this.state;
    if (player) {
      player.seekTo(time);
      this.setState({
        currentTime: time,
      });
    }
  }

  updateTime() {
    const { player } = this.state;
    if (player) {
      const currentTime = player.getCurrentTime();
      const duration = player.getDuration();
      if (duration > 0) {  
        const progressPercentage = (currentTime / duration) * 100;
        this.setState({ currentTime });
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
          progressBar.style.setProperty('--progress', `${progressPercentage}%`);
        }
      }
    }
  }
  

  onPlayNext(event) {
    const { player, isRepeat, isPlaying } = this.state;
    const { station, currSong } = this.props;
    let nextSongIdx = station.songs.findIndex(song => song.id === currSong.id) + 1;
    if (station.songs[nextSongIdx]) {
      const nextSong = station.songs[nextSongIdx];
      updateSong(nextSong);
    } else if(!station.songs[nextSongIdx] && isRepeat || isPlaying || !isPlaying){
      nextSongIdx = 0;
      const nextSong = station.songs[nextSongIdx];
      updateSong(nextSong);
    } else {
      return
    }
    setTimeout(() => {
      player.playVideo();
    }, 1000);
  }

  onPlayPrevious() {
    const { player } = this.state;
    const { station, currSong } = this.props;
    let previousSongIdx = station.songs.findIndex(song => song.id === currSong.id) - 1;
    if (station.songs[previousSongIdx]) {
      const previousSong = station.songs[previousSongIdx];
      updateSong(previousSong);
    } else {
      previousSongIdx = station.songs.length - 1;
      const previousSong = station.songs[previousSongIdx];
      updateSong(previousSong);
    }
    setTimeout(() => {
      player.playVideo();
    }, 1000);
  }

  render() {
    const opts = {
      height: '0',
      width: '0',
      playerVars: {
        autoplay: 0,
        controls: 0,
      },
    };
    const { videoId } = this.props;
    const { isPlaying, volume, currentTime, duration, isRepeat, isShuffle } = this.state;

    return (
      <>
        <section className="player-seek-and-control">
          <section className="player-controls">
            <Shuffle className={isShuffle ? 'clicked' : ''} onClick={this.toggleShuffle} />
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
            <Repeat className={isRepeat ? 'clicked' : ''} onClick={this.toggleRepeat} />
          </section>
          <ProgressBar
            currentTime={currentTime}
            duration={duration}
            onSeek={this.handleSeek}
          />
        </section>
        <section className="player-controls">
          <NowPlaying />
          <Queue />
          {
                (() => {
                    if(volume === 0) {
                            return (
                                <VolumeMuted onClick={this.toggleMute} />
                            )
                        } else if (volume > 0 && volume < 35) {
                          return( 
                            <VolumeMin onClick={this.toggleMute} />
                          )
                        } else if (volume >= 35 && volume < 65) {
                            return (
                            <VolumeMedium onClick={this.toggleMute} />
                            )
                        } else if (volume >= 65){
                            return (
                              <VolumeMax onClick={this.toggleMute} />
                            )
                        }
                })()  
            }
          <div className="volume-slider-container">
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              step="1"
              onChange={this.handleVolumeChange}
              className="volume-slider"
              style={{ '--volume': `${volume}%`}}
            />
          </div>
        </section>
      </>
    );
  }
}

export default Player;
