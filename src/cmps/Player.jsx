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
import VolumeDown from '../assets/icons/volumedown.svg?react';
import VolumeUp from '../assets/icons/volumeup.svg?react';
import ProgressBar from './ProgressBar';

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
    };
    this.onReady = this.onReady.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.toggleRepeat = this.toggleRepeat.bind(this)
    this.toggleShuffle = this.toggleShuffle.bind(this)
    this.togglePlayPause = this.togglePlayPause.bind(this);
    this.handleSeek = this.handleSeek.bind(this);
    this.updateTime = this.updateTime.bind(this);
  }

  onReady(event) {
    this.setState({
      player: event.target,
      duration: event.target.getDuration(),
    });
    event.target.setVolume(this.state.volume);
    event.target.playVideo();
  }

  onStateChange(event) {
    const { player, isRepeat } = this.state;
    if (isRepeat && event.data === window.YT.PlayerState.ENDED) {
      player.playVideo();
    } else if (event.data === window.YT.PlayerState.ENDED) {
      this.setState({
        isPlaying: false,
        currentTime: 0,
        duration: player.getDuration(),
      });
    } else {
      player.playVideo();
      this.setState({
        isPlaying: true,
      });
    }
    if (event.data === window.YT.PlayerState.PLAYING) {
      this.interval = setInterval(this.updateTime, 1000);
    } else {
      clearInterval(this.interval);
    }
  }

  togglePlayPause() {
    const { player, isPlaying } = this.state;
    console.log(player)
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
    const {isPlaying, isRepeat } = this.state;
    if (isPlaying) {
        this.setState({
            isRepeat: !isRepeat,
          });
    } 
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
  }

  handleSeek(time) {
    const { player } = this.state;
    if (player) {
      player.seekTo(time);
    }
  }

  updateTime() {
    const { player } = this.state;
    if (player) {
      this.setState({
        currentTime: player.getCurrentTime(),
      });
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
    };
    const { videoId } = this.props;
    const { isPlaying, volume, currentTime, duration, isRepeat, isShuffle } = this.state;

    return (
      <>
        <section className="player-seek-and-control">
          <section className="player-controls">
            <Shuffle className={(isShuffle) ? 'clicked' : ''} onClick={this.toggleShuffle} />
            <Previous />
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
            <Next />
            <Repeat className={(isRepeat) ? 'clicked' : ''} onClick={this.toggleRepeat} />
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
            {(volume > 75) ? <VolumeUp /> : <VolumeDown />}
            <div className="volume-slider-container">
            <input
                type="range"
                min="0"
                max="100"
                value={volume}
                step="1"
                onChange={this.handleVolumeChange}
                className="volume-slider"
              />
          </div>
        </section>
      </>
    );
  }
}

export default Player;
