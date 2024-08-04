import { useSelector } from "react-redux"
import AddIcon from "../assets/icons/addsong.svg?react"
import LikeIcon from "../assets/icons/likedsong.svg?react"
import Player from "./Player.jsx"
import { Link, useNavigate } from "react-router-dom"
import { ArtistCmp } from "./ArtistCmp.jsx"
import { useLayoutEffect, useState } from "react"
import { FastAverageColor } from "fast-average-color"
/* import { getLyrics } from "../services/genius.service.js" */

export function AppPlayer() {
  const Navigate = useNavigate()
  const [color, setColor] = useState(null)
  const station = useSelector((storeState) => storeState.stationModule.station)
  const currSong = useSelector(
    (storeState) => storeState.stationModule.currSong
  )
  const user = useSelector(
    (storeState) => storeState.userModule.user
  )
  const [pageWidth, setPageWidth] = useState(window.innerWidth)

  useLayoutEffect(() => {
    // Function to handle resize event
    const handleResize = () => {
      setPageWidth(window.innerWidth)
    }

    // Attach resize event listener
    window.addEventListener('resize', handleResize)

    // Clean up function
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [pageWidth])

  function onOpenPlayerPhone() {
    if (pageWidth > 500) return
    const elDetails = document.querySelector('.app-player')
    elDetails.classList.add('details-player')
  }
  function onClosePlayer() {
    if (pageWidth > 500) return
    const elDetails = document.querySelector('.app-player')
    elDetails.classList.remove('details-player')
  }
  if (pageWidth < 500 && currSong) {
    console.log(currSong)
    if (currSong.imgUrl) {
      const fac = new FastAverageColor()
      fac.getColorAsync(currSong.imgUrl).then((color) => {
        setColor(color.rgb)
      })
      
    } else {
      setColor("rgba(66, 64, 64, 0.6) 0")
    }
    
  }
  return (
    <section style={{backgroundColor:color}} className="app-player">
      <svg onClick={onClosePlayer} className="down-svg" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
      <section>
        {currSong && (
          <section  onClick={onOpenPlayerPhone} className="song-detail">
            <img className="song-image" src={currSong.imgUrl || station.imgUrl} />
            <section className="song-info">
              <div className="song-title">
                {currSong.title || currSong.name}
              </div>
              <section className="artist">
                <ArtistCmp artists={currSong.artists} />
              </section>
            </section>
            {(currSong.likedBy?.find(likeUser => likeUser._id === user._id)) ? <LikeIcon className="add-icn like-icn" /> : <AddIcon className="add-icn"/>}
          </section>
        )}  
       
      </section>
      <Player
        videoId={currSong !== null ? currSong.id : ""}
        currSong={currSong}
        station={station}
      />
      
    </section>
  )
}
