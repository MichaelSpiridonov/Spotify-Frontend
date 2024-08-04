import React, { useEffect, useState } from 'react'
import { getLyrics } from '../services/util.service'
import { useSelector } from 'react-redux'
import { FastAverageColor } from 'fast-average-color'
import { AppHeader } from '../cmps/AppHeader'
import { Loading } from '../cmps/Loading'

export function Lyrics() {
  const [color, setColor] = useState(null)
  const [lyrics, setLyrics] = useState(null)
  const currSong = useSelector(
    (storeState) => storeState.stationModule.currSong
  )
  useEffect(() => {
    getSongLyrics(currSong).catch((err) => {
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
  console.log(lyrics)
  if (!lyrics) return <Loading />
  return (
    <React.Fragment>
      <section className='lyrics-box' style={{ backgroundColor: color }}>
        <AppHeader color={color} />
        {lyrics && (
          <section
            style={{ backgroundColor: color }}
            className='lyrics-container'
          >
            <pre>{lyrics}</pre>
          </section>
        )}
        {!lyrics && (
          <div className='none-lyrics'>
            Hmm. We don't know the lyrics for this one.
          </div>
        )}
      </section>
    </React.Fragment>
  )
}
