import React, { useState, useEffect, useRef, useCallback } from 'react';
import YouTube from 'react-youtube';
import ProgressBar from './ProgressBar';
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
import RepeatSong from '../assets/icons/repeatsong.svg?react';
import { updateSong } from '../store/actions/station.actions.js';
import { getVideos } from '../services/youtube.service.js';

export function Player(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState(null);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isRepeatSong, setIsRepeatSong] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [volume, setVolume] = useState(25);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(25);
  const [shuffledSongs, setShuffledSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const intervalRef = useRef(null);

  function onReady(event) {
    setPlayer(event.target);
    setDuration(event.target.getDuration());
    event.target.setVolume(volume);
  }

  const onStateChange = useCallback(async (event) => {
    if (isRepeat && event.data === window.YT.PlayerState.ENDED) {
      onPlayNext();
      setTimeout(() => {
        player.playVideo();
      }, 1000);
    } else if (isRepeatSong && event.data === window.YT.PlayerState.ENDED) {
      setTimeout(() => {
        player.playVideo();
      }, 1000);
    } else if (event.data === window.YT.PlayerState.ENDED) {
      onPlayNext();
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(player.getDuration());
    } else if (event.data !== window.YT.PlayerState.PAUSED) {
      player.playVideo();
      setIsPlaying(true);
    }
    if (event.data === window.YT.PlayerState.PLAYING) {
      startProgressUpdate();
    } else {
      stopProgressUpdate();
    }
  }, [isRepeat, isRepeatSong, player]);

  function startProgressUpdate() {
    const update = () => {
      updateTime();
      intervalRef.current = requestAnimationFrame(update);
    };
    update();
  }

  function stopProgressUpdate() {
    if (intervalRef.current) {
      cancelAnimationFrame(intervalRef.current);
      intervalRef.current = null;
    }
  }

  useEffect(() => {
    startProgressUpdate();
    return () => stopProgressUpdate();
  }, []);

  function togglePlayPause() {
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
    setIsPlaying(!isPlaying);
  }

  function toggleRepeat() {
    if (!isRepeat && !isRepeatSong) {
      setIsRepeat(!isRepeat);
    } else if (isRepeat) {
      setIsRepeat(!isRepeat);
      setIsRepeatSong(!isRepeatSong);
    } else {
      setIsRepeatSong(!isRepeatSong);
    }
  }

  function toggleShuffle() {
    setIsShuffle(!isShuffle);

    if (!isShuffle) {
      const shuffledSongs = [...props.station.songs];
      for (let i = shuffledSongs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledSongs[i], shuffledSongs[j]] = [shuffledSongs[j], shuffledSongs[i]];
      }
      setShuffledSongs(shuffledSongs);
    }
  }

  function handleVolumeChange(event) {
    const newVolume = +event.target.value;
    if (player) {
      player.setVolume(newVolume);
    }
    setVolume(newVolume);
    document.querySelector('.volume-slider').style.setProperty('--volume', `${newVolume}%`);
  }

  function toggleMute() {
    if (isMuted) {
      player.setVolume(previousVolume);
      setIsMuted(false);
      setVolume(previousVolume);
    } else {
      setPreviousVolume(volume)
      player.setVolume(0);
      setIsMuted(true);
      setVolume(0);
    }
  }

  function handleSeek(time) {
    if (player) {
      player.seekTo(time);
      setCurrentTime(time);
    }
  }

  function updateTime() {
    if (player) {
      const currentTime = player.getCurrentTime();
      const duration = player.getDuration();
      if (duration > 0) {
        const progressPercentage = (currentTime / duration) * 100;
        setCurrentTime(currentTime);
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
          progressBar.style.setProperty('--progress', `${progressPercentage}%`);
        }
      }
    }
  }

  async function getVideoId(name) {
    const id = await getVideos(name)
    return id[0].videoId
  }

  async function onPlayNext(event) {
    const { station, currSong } = props;
    const songs = isShuffle ? shuffledSongs : station.songs;
    let nextSongIdx = songs.findIndex(song => song._id === currSong._id) + 1;
    if (songs[nextSongIdx] && !isRepeatSong) {
      const nextSong = songs[nextSongIdx];
      const id = await getVideoId(nextSong.title)
      nextSong.id = id
      updateSong(nextSong);
    } else if (!songs[nextSongIdx] && (isRepeat || isShuffle || isPlaying && event.type === 'click')) {
      nextSongIdx = 0;
      const nextSong = songs[nextSongIdx];
      const id = await getVideoId(nextSong.title)
      nextSong.id = id
      updateSong(nextSong);
    } else if (isRepeatSong) {
      player.playVideo();
    } else {
      return;
    }
    setTimeout(() => {
      player.playVideo();
    }, 1000);
  }

  async function onPlayPrevious() {
    const { station, currSong } = props;
    const songs = isShuffle ? shuffledSongs : station.songs;
    let previousSongIdx = songs.findIndex(song => song._id === currSong._id) - 1;
    if (songs[previousSongIdx]) {
      const previousSong = songs[previousSongIdx];
      updateSong(previousSong);
    } else {
      previousSongIdx = songs.length - 1;
      const previousSong = songs[previousSongIdx];
      const id = await getVideoId(previousSong.title)
      previousSong.id = id
      updateSong(previousSong);
    }
    setTimeout(() => {
      player.playVideo();
    }, 1000);
  }

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 0,
      controls: 0,
    },
  };
  const { videoId } = props;

  return (
    <>
      <section className="player-seek-and-control">
        <section className="player-controls">
          <span className={`effects ${isShuffle ? 'clicked' : ''}`}>
            <Shuffle onClick={toggleShuffle} />
          </span>
          <Previous onClick={onPlayPrevious} />
          <section className="player">
            <YouTube
              className="video-player"
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
          <Next onClick={onPlayNext} />
          <span className={`effects ${isRepeat || isRepeatSong ? 'clicked' : ''}`}>
            {!isRepeatSong && !isRepeat ? <Repeat onClick={toggleRepeat} /> : ''}
            {isRepeat ? <Repeat onClick={toggleRepeat} /> : ''}
            {isRepeatSong ? <RepeatSong onClick={toggleRepeat} /> : ''}
          </span>
        </section>
        <ProgressBar className='progras-bar' currentTime={currentTime} duration={duration} onSeek={handleSeek} />
      </section>
      <section className="player-controls">
        <NowPlaying />
        <Queue />
        {volume === 0 || isMuted ? (
          <VolumeMuted  onClick={toggleMute}/>
        ) : volume < 30 ? (
          <VolumeMin onClick={toggleMute} />
        ) : volume < 70 ? (
          <VolumeMedium onClick={toggleMute} />
        ) : (
          <VolumeMax onClick={toggleMute} />
        )}
        <div className="volume-slider-container">
          <input
            type="range"
            min="0"
            max="100"
            value={previousVolume || volume || 25}
            step="1"
            onChange={handleVolumeChange}
            className="volume-slider"
            style={{ '--volume': `${volume}%` }}
          />
        </div>
      </section>
    </>
  );
}

export default Player;
