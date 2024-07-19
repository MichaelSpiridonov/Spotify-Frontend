import { useSelector } from 'react-redux'
import AddIcon from '../assets/icons/addsong.svg?react'
import Play from '../assets/icons/play.svg?react'
import {  updateSong } from '../store/actions/station.actions'
export function SongPreview({ song }) {
    function onClickPlay(song,target){
        console.log(target)
        let station = {title:song.title,id :song.videoId, imgUrl: song.thumbnail}
        updateSong(station)
    }
    function onActive({target}){ 
        
    }
    return <article onClick={onActive} className="song-item">
        <img src={song.thumbnail} alt="" /> 
        <button onClick={({target})=> onClickPlay(song,target)}><Play /></button>
        <h1>{song.title}</h1>
        <AddIcon />
    </article>
}