import { useSelector } from "react-redux"
import AddIcon from "../assets/icons/addsong.svg?react"
import Player from "./Player.jsx"
import { Link, useNavigate } from "react-router-dom"
import { ArtistCmp } from "./ArtistCmp.jsx"
import { useLayoutEffect, useState } from "react"

export function AppPlayer() {
  const Navigate = useNavigate()
  const station = useSelector((storeState) => storeState.stationModule.station)
  const currSong = useSelector(
    (storeState) => storeState.stationModule.currSong
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

  function onOpenPlayerPhone(){
    if(pageWidth>500)return
    Navigate('/player')
  }
  return (
    <section onClick={onOpenPlayerPhone} className="app-player">
      <section>
        {currSong && (
          <section className="song-detail">
            <img className="song-image" src={currSong.imgUrl} />
            <section className="song-info">
              <Link to={`album/:albumId`} className="song-title">
                {currSong.title.replace(/^.*?-/, "")}
              </Link>
              <section className="artist">
                  <ArtistCmp artists={currSong.artists} />
              </section>
            </section>
            <AddIcon className="add-icn" />
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
