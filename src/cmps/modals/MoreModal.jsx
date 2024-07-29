import { useSelector } from 'react-redux'
import { removeSong, setCurrStation, updateStations } from '../../store/actions/station.actions'
import { makeId } from '../../services/util.service'
import { addStation } from '../../store/actions/station.actions'
import { stationService } from '../../services/station'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { showNotificationMsg } from '../../services/event-bus.service'

export function MoreModal() {
    const { stationId } = useParams()
    const stations = useSelector(storeState => storeState.stationModule.stations)
    const [station, setStation] = useState(null)
    const song = useSelector((storeState) => storeState.stationModule.currSelectedSong)
    const user = useSelector((storeState) => storeState.userModule.user)
    useEffect(() => {
        if(stationId){
            loadLocalStation(stationId)
        }
    }, [stationId])
    async function loadLocalStation(stationId) {
        const station = await stationService.getById(stationId)
        setStation(station)
    }

    const element = document.querySelector('.create-modal')
    function onOpenStations() {
        const element = document.querySelector('.stations-modal')
        element.style.display = 'block'
    }
    function onCLoseStations() {
        const element = document.querySelector('.stations-modal')
        element.style.display = 'none'
    }
    function onAddToPlaylst(station, idx) {
        console.log(song)
        showNotificationMsg(`Added to ${station.name}`, station.imgUrl)
        updateStations(song, station)
    }
    async function onAddNewStation() {
        const element = document.querySelector('.more-modal')
        element.style.display = 'none'
        const station = {
            createdBy: { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl },
            likedByUsers: ['{minimal-user}', '{minimal-user}'],
            name: song.title,
            songs: [(song)],
            tags: [],
            imgUrl: song.imgUrl,
        }
        await addStation(station)
        showNotificationMsg(`Added to ${station.name}`, song.imgUrl)
    }

    async function onRemoveSong() {
        await removeSong(song._id, station)
        setCurrStation(station)
        showNotificationMsg(`Removed From Your Library`)
        element.style.display = 'none'
    }

    function clickOutsideListener(event) {
        if (!element) return
        if (!element.contains(event.target)) {
            // Click outside the target element
            element.style.display = 'none'
            // Do something here, such as closing a modal, hiding a dropdown, etc.
        }
    }
    document.addEventListener('click', clickOutsideListener)
    if (!stations) return
    return <article className='more-modal'>
        <ul key={'modal-container'}>
            <li key={'add'} onMouseOver={onOpenStations} className='add-to-playlist'><svg data-encore-id='icon' role='img' aria-hidden='true' viewBox='0 0 16 16' ><path d='M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z' ></path></svg>Add to playlist</li>
            {station&&station.tags && <li onMouseOver={onCLoseStations} onClick={onRemoveSong}><svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" ><path d="M5.25 3v-.917C5.25.933 6.183 0 7.333 0h1.334c1.15 0 2.083.933 2.083 2.083V3h4.75v1.5h-.972l-1.257 9.544A2.25 2.25 0 0 1 11.041 16H4.96a2.25 2.25 0 0 1-2.23-1.956L1.472 4.5H.5V3h4.75zm1.5-.917V3h2.5v-.917a.583.583 0 0 0-.583-.583H7.333a.583.583 0 0 0-.583.583zM2.986 4.5l1.23 9.348a.75.75 0 0 0 .744.652h6.08a.75.75 0 0 0 .744-.652L13.015 4.5H2.985z"></path></svg>Remove from playlist</li>}
            <li key={'save'} onMouseOver={onCLoseStations}><svg data-encore-id='icon' role='img' aria-hidden='true' viewBox='0 0 16 16'><path d='M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z'></path><path d='M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75z'></path> </svg>Save to Liked Songs</li>
            <li key={'artist'} onMouseOver={onCLoseStations}><svg data-encore-id='icon' role='img' aria-hidden='true' viewBox='0 0 16 16' ><path d='M11.757 2.987A4.356 4.356 0 0 0 7.618 0a4.362 4.362 0 0 0-4.139 2.987 5.474 5.474 0 0 0-.22 1.894 5.604 5.604 0 0 0 1.4 3.312l.125.152a.748.748 0 0 1-.2 1.0128l-2.209 1.275A4.748 4.748 0 0 0 0 14.857v1.142h8.734A5.48 5.48 0 0 1 8.15 14.5H1.517a3.245 3.245 0 0 1 1.6-2.454l2.21-1.275a2.25 2.25 0 0 0 .6-3.386l-.128-.153a4.112 4.112 0 0 1-1.05-2.44A4.053 4.053 0 0 1 4.89 3.47a2.797 2.797 0 0 1 1.555-1.713 2.89 2.89 0 0 1 3.293.691c.265.296.466.644.589 1.022.12.43.169.876.144 1.322a4.12 4.12 0 0 1-1.052 2.44l-.127.153a2.239 2.239 0 0 0-.2 2.58c.338-.45.742-.845 1.2-1.173 0-.162.055-.32.156-.447l.126-.152a5.598 5.598 0 0 0 1.4-3.312 5.499 5.499 0 0 0-.218-1.894zm3.493 3.771a.75.75 0 0 0-.75.75v3.496h-1a2.502 2.502 0 0 0-2.31 1.542 2.497 2.497 0 0 0 1.822 3.406A2.502 2.502 0 0 0 16 13.502V7.508a.75.75 0 0 0-.75-.75zm-.75 6.744a.998.998 0 0 1-1.707.707 1 1 0 0 1 .707-1.706h1v1z'></path></svg>Go to artist</li>
            <li key={'album'} onMouseOver={onCLoseStations}><svg data-encore-id='icon' role='img' aria-hidden='true' viewBox='0 0 16 16' ><path d='M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z'></path><path d='M8 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM5 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0z'></path></svg>Go to album</li>

        </ul>
        <div className='stations-modal' key={'stations-modal'}>
            <ul>
                <li onClick={onAddNewStation}><svg data-encore-id='icon' role='img' aria-hidden='true' viewBox='0 0 16 16' ><path d='M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z' ></path></svg>New playlist</li>
                {stations.filter(station => station.createdBy?._id === user?._id).map((station, idx) => <li key={idx} onClick={() => onAddToPlaylst(station, idx)}>{station.name}</li>)}
            </ul>
        </div>
    </article>
}