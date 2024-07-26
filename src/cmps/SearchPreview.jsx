
import { useState } from 'react'
import AddIcon from '../assets/icons/addsong.svg?react'
import Play from '../assets/icons/play.svg?react'
import { updateSong } from '../store/actions/station.actions'

import { addToLikedSongs } from '../store/actions/station.actions'
import { MoreModal } from './modals/MoreModal'
import { formatDate, formatDuration } from '../services/util.service'
import { getVideos } from '../services/youtube.service'
export function SearchPreview({ song }) {
    const [songToAdd, setSongToAdd] = useState(null)
    var count = 0
    async function onClickPlay(song, target) {
        var videoId = await getVideoId(song.title)
        console.log(videoId)
        let station = { title: song.title, id: videoId, imgUrl: song.imgUrl, artists: [song.artist] }
        updateSong(station)
    }
    async function getVideoId(name) {
        var id = await getVideos(name)
        return id[0].videoId
    }
    function onAddTo(event) {
        setSongToAdd(song)
        const x = event.clientX
        const y = event.clientY
        console.log(`Clicked at X=${x}, Y=${y}`)
        const elModal = document.querySelector('.more-modal')
        elModal.style.left = `${x}px`
        elModal.style.top = `${y}px`
        elModal.style.display = 'block'
    }

    const targetElement = document.querySelector('.more-modal');
    const element = document.querySelector('.search-page .station-details')
    if (element) {
        element.addEventListener('contextmenu', function (event) {
            // Prevent the default context menu from appearing
            event.preventDefault();
            setSongToAdd(song)
            // Check if the right mouse button was clicked
            if (event.button === 2) {
                // Right-click was detected
                console.log('Right-click detected!');
                event.preventDefault();
                const x = event.clientX
                const y = event.clientY + 20

                const elModal = document.querySelector('.more-modal')
                elModal.style.left = `${x}px`
                elModal.style.top = `${y}px`
                elModal.style.display = 'block'
                // You can add your own custom logic here
            }
        });
    }

    // Function to check if the click is outside the target element
    function clickOutsideListener(event) {
        count++
        if (!targetElement) return
        if (!targetElement.contains(event.target) && count == 2) {
            count = 0
            // Click outside the target element 
            targetElement.style.display = 'none'
            // Do something here, such as closing a modal, hiding a dropdown, etc.
        }
    }
    function onAddToLikedSongs() {
        const newSong = { title: song.title, id: song.videoId, imgUrl: song.thumbnail }
        addToLikedSongs(newSong)
    }
    // Adding click event listener to the document
    document.addEventListener('click', clickOutsideListener);
    return <article id={song.title} className='item'>
        <div className='play-button' onClick={({ target }) => onClickPlay(song, target)}><Play /></div>
        <img className='song-image' src={song.imgUrl} alt='' />
        <section>
            <span className='station-song-detail'>{song.title}</span>
            <span className='song-artist' >{song.artist}</span>
        </section>
        <span className='song-album'>{song.albumName}</span>
        <span className='song-date'>{formatDate(song.realeasesDate)}</span>
        <div className='add-button'>
            <AddIcon onClick={onAddToLikedSongs} />
        </div>
        <span className='song-length'>{formatDuration(song.duration)}</span>
        <div className='options-button' >
            <svg onClick={onAddTo} data-encore-id='icon' role='img' aria-hidden='true' viewBox='0 0 16 16' ><path d='M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z'></path></svg>
        </div>
        <MoreModal song={songToAdd} />
    </article>
}