
import { useEffect, useLayoutEffect, useState } from 'react'
import AddIcon from '../assets/icons/addsong.svg?react'
import Play from '../assets/icons/play.svg?react'
import { setCurrSelectedSong, updateSong } from '../store/actions/station.actions'

import { addToLikedSongs } from '../store/actions/station.actions'
import { MoreModal } from './modals/MoreModal'
import { formatDate, formatDuration } from '../services/util.service'
import { getVideos } from '../services/youtube.service'
export function SearchPreview({ song }) {
    const [songToAdd, setSongToAdd] = useState(null)
    var count = 0
    async function onClickPlay(song, target) {
        console.log(target)
        {
            console.log('hi')
            var videoId = await getVideoId(song.title)
            console.log(videoId)
            let station = { title: song.title, id: videoId, imgUrl: song.imgUrl, artists: [{ name: song.artists[0] }] }
            console.log(station)
            updateSong(station)
        }
    }
    async function onClickPlayPhone(song, target) {
        if (pageWidth < 500) {
            console.log('hi')
            var videoId = await getVideoId(song.title)
            console.log(videoId)
            let station = { title: song.title, id: videoId, imgUrl: song.imgUrl, artists: [{ name: song.artists[0] }] }
            console.log(station)
            updateSong(station)
        }
    }
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

    async function getVideoId(name) {
        var id = await getVideos(name)
        return id[0].videoId
    }
    function onAddTo(event) {
        console.log(song)
        let newSong = {
            ...song,
            addedAt: Date.now(),
            artists: [{ name: song.artists[0] }]

        }
        setCurrSelectedSong(newSong)
        setSongToAdd(newSong)
        const x = event.clientX - 550
        const y = event.clientY
        console.log(`Clicked at X=${x}, Y=${y}`)
        const elModal = document.querySelector('.more-modal')
        console.log(elModal)
        elModal.style.left = `${x}px`
        elModal.style.top = `${y}px`
        elModal.style.display = 'block'
        event.stopPropagation();
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
                const x = event.clientX - 510
                const y = event.clientY - 10
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
    console.log(song)
    // Adding click event listener to the document
    document.addEventListener('click', clickOutsideListener);
    return <article id={song.title} onClick={({ target }) => onClickPlayPhone(song, target)} className='item'>
        <section className='left-side-preview'>
            <div className='play-button' onClick={({ target }) => onClickPlay(song, target)}><Play /></div>
            <img className='song-image' src={song.imgUrl} alt='' />
            <section className='info-container'>
                <span className='station-song-detail'>{song.title}</span>
                <span className='song-artist' >{song.artists[0]}</span>
            </section>
        </section>
        <span className='song-album'>
           {song.albumName}
        </span>
        <section className='right-side-preview'>

            <div className='add-button'>
                <AddIcon onClick={onAddToLikedSongs} />
            </div>
            <span className='song-length'>{formatDuration(song.duration)}</span>
            <div className='options-button' >
                <svg onClick={onAddTo} data-encore-id='icon' role='img' aria-hidden='true' viewBox='0 0 16 16' ><path d='M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z'></path></svg>
            </div>
        </section>
    </article>
}