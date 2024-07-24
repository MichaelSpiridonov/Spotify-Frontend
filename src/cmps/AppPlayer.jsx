import { useSelector } from "react-redux"
import AddIcon from "../assets/icons/addsong.svg?react"
import Player from "./Player.jsx"
import { Link } from "react-router-dom"

export function AppPlayer() {
  const station = useSelector((storeState) => storeState.stationModule.station)
  const currSong = useSelector(
    (storeState) => storeState.stationModule.currSong
  )
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
                {currSong.artists.map((artist, index) => (
                  <span key={artist.id}>
                    <Link to={`artist/${artist.id}`} className="artist-name">
                      {artist.name}
                    </Link>
                    {index < currSong.artists.length - 1 && ", "}
                  </span>
                ))}
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
