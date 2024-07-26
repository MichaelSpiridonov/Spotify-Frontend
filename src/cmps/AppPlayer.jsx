import { useSelector } from "react-redux"
import AddIcon from "../assets/icons/addsong.svg?react"
import Player from "./Player.jsx"
import { Link } from "react-router-dom"
import { ArtistCmp } from "./ArtistCmp.jsx"

export function AppPlayer() {
  const station = useSelector((storeState) => storeState.stationModule.station)
  const currSong = useSelector(
    (storeState) => storeState.stationModule.currSong
  )
  console.log(currSong)
  return (
    <section className="app-player">
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
