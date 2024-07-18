
import YouTube from 'react-youtube';
import React, { Component } from 'react'
import Play from '../assets/icons/play.svg?react'
import Pause from '../assets/icons/pause.svg?react'

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isPlaying: false,
          player: null
        };
        this.onReady = this.onReady.bind(this);
        this.togglePlayPause = this.togglePlayPause.bind(this);
      }

    onReady(event) {
      // access to player in all event handlers via event.target
        this.setState({
      player: event.target
    });
    }

    togglePlayPause() {
        const { player, isPlaying } = this.state;
        if (isPlaying) {
          player.pauseVideo();
        } else {
          player.playVideo();
        }
        this.setState({
          isPlaying: !isPlaying
        });
      }

    onEnd() {
        const { isPlaying } = this.state;
        this.setState({
          isPlaying: !isPlaying
        });
    }

  
    render() {
      const opts = {
        height: '0',
        width: '0',
        playerVars: {
          autoplay: 0,
          controls: 0
        },
      };
      const {videoId} = this.props
      const { isPlaying } = this.state

  
      return (
        <section className='player'>
            <YouTube className="video-player" videoId={videoId} opts={opts} onReady={this.onReady} onEnd={this.onEnd} />
            {isPlaying ? 
          <Pause onClick={this.togglePlayPause} /> : 
          <Play onClick={this.togglePlayPause} />}
        </section>
      )
    }
  }

export default Player