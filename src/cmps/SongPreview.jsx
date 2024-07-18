import AddIcon from '../assets/icons/addsong.svg?react'

export function SongPreview({ song }) {

    return <article className="song-item">
        <img src={song.thumbnail} alt="" />
        <h1>{song.title}</h1>
        <AddIcon />
    </article>
}