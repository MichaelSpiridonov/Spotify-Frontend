
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


    function onClosePlayer() {

    }
    if (currSong) {
        const elPlayer = document.querySelector('.app-player')
        elPlayer.style.display = 'none'
        const fac = new FastAverageColor()
        fac.getColorAsync(currSong.imgUrl).then((color) => {
            setColor(color.rgb)
        })
    }
    if (pageWidth < 500 && !currSong) return <Loading />
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
                            <section className="add-icn-page">

                                <Link to='/lyrics'><svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" ><path d="M13.426 2.574a2.831 2.831 0 0 0-4.797 1.55l3.247 3.247a2.831 2.831 0 0 0 1.55-4.797zM10.5 8.118l-2.619-2.62A63303.13 63303.13 0 0 0 4.74 9.075L2.065 12.12a1.287 1.287 0 0 0 1.816 1.816l3.06-2.688 3.56-3.129zM7.12 4.094a4.331 4.331 0 1 1 4.786 4.786l-3.974 3.493-3.06 2.689a2.787 2.787 0 0 1-3.933-3.933l2.676-3.045 3.505-3.99z"></path></svg></Link>
                                <AddIcon />
                            </section>
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
