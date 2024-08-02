import React, { useEffect, useState } from "react"
import { getLyrics } from "../services/util.service"
import { useSelector } from "react-redux"
import { FastAverageColor } from "fast-average-color"
import { AppHeader } from "../cmps/AppHeader"


export function Lyrics() {
    const [color, setColor] = useState(null)
    const [lyrics, setLyrics] = useState(null)
    const currSong = useSelector(
        (storeState) => storeState.stationModule.currSong
    )
    useEffect(() => {
        getSongLyrics(currSong)
            .catch(err => {
                showErrorMsg('Cannot load lyrics!')
                throw err
            })
    }, [currSong])
    async function getSongLyrics(song) {
        const lyrics = await getLyrics(song)
        setLyrics(lyrics)
    }
    const fac = new FastAverageColor()
    fac.getColorAsync(currSong.imgUrl).then((color) => {
        setColor(color.rgb)
    })
    if (!lyrics) return
    return <React.Fragment>
        <section  >
            <AppHeader color={color} />
            <section style={{ backgroundColor: color }} className="lyrics-container">
                {lyrics}
            </section>
        </section>
    </React.Fragment>
}