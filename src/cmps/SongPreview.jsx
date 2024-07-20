
import { useState } from 'react'
import AddIcon from '../assets/icons/addsong.svg?react'
import Play from '../assets/icons/play.svg?react'
import { updateSong } from '../store/actions/station.actions'
import { MoreModal } from './MoreModal'
export function SongPreview({ song }) {
    const [songToAdd, setSongToAdd] = useState(null)
    function onClickPlay(song, target) {
        console.log(target)
        let station = { title: song.title, id: song.videoId, imgUrl: song.thumbnail }
        updateSong(station)
    }
    function onAddTo(event,) {
        setSongToAdd(song)
        const x = event.clientX 
        const y = event.clientY +20
        console.log(`Clicked at X=${x}, Y=${y}`)
        const element = document.querySelector('.more-modal')
        element.style.left = `${x}px`
        element.style.top = `${y}px`
        element.style.display = 'block'
    }
    return <article /* onClick={onActive} */ className="song-item">
        <img src={song.thumbnail} alt="" />
        <button onClick={({ target }) => onClickPlay(song, target)}><Play /></button>
        <h1>{song.title}</h1>
            <AddIcon  onClick={onAddTo}/>
            <MoreModal song={songToAdd}/>
    </article>
}