import { useSelector } from 'react-redux'
import AddIcon from '../assets/icons/addsong.svg?react'
import Play from '../assets/icons/play.svg?react'
import {  updateStation } from '../store/actions/station.actions'
export function SongPreview({ song }) {
    function onClickPlay(song){
        
        let station = {songs: [{title:song.title,id :song.videoId, img: song.thumbnail}] }
        updateStation(station)
    }
    return <article className="song-item">
        <img src={song.thumbnail} alt="" /> 
        <button onClick={()=> onClickPlay(song)}><Play /></button>
        <h1>{song.title}</h1>
        <AddIcon />
    </article>
}