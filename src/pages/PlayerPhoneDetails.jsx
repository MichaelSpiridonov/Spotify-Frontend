
import { useSelector } from "react-redux"
import AddIcon from "../assets/icons/addsong.svg?react"

import { Link, useNavigate } from "react-router-dom"

import { useLayoutEffect, useState } from "react"
import Player from "../cmps/Player.jsx"
import { ArtistCmp } from "../cmps/ArtistCmp.jsx"
import { FastAverageColor } from "fast-average-color"
import { Loading } from "../cmps/Loading.jsx"

export function PlayerPhoneDetails() {
    const Navigate = useNavigate()
    const [color, setColor] = useState(null)
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

    
    function onClosePlayer(){

    }
    if (currSong) {
        const elPlayer = document.querySelector('.app-player')
        elPlayer.style.display = 'none'
        const fac = new FastAverageColor()
        fac.getColorAsync(currSong.imgUrl).then((color) => {
            setColor(color.rgb)
        })
    }
    if (pageWidth < 500 && !currSong) return <Loading/>
    return (
        <section style={{ backgroundColor: color }} onClick={onOpenPlayerPhone} className="details-player">
            <section>
            
                {currSong && (
                    <section className="song-detail-page">
                        <img className="song-image-page" src={currSong.imgUrl} />
                        <section className="song-info-page">
                            <section>
                                <Link to={`album/:albumId`} className="song-title-page">
                                    {currSong.title.replace(/^.*?-/, "")}
                                </Link>
                                <section className="artist-page">
                                    <ArtistCmp artists={currSong.artists} />
                                </section>

                            </section>
                            <AddIcon className="add-icn-page" />
                        </section>

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
