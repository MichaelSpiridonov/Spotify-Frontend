import { useSelector } from "react-redux"
import { updateStations } from "../../store/actions/station.actions"
import { makeId } from "../../services/util.service"
import { addNewStation } from "../../store/actions/station.actions"
import { stationService } from "../../services/station/station.service.local"

export  function MoreModal({ song }) {
    const stations = useSelector(storeState => storeState.stationModule.stations)
    function onOpenStations() {
        const element = document.querySelector('.stations-modal')
        element.style.display = 'block'
    }
    function onCLoseStations() {
        const element = document.querySelector('.stations-modal')
        element.style.display = 'none'
    }
    function onAddToPlaylst(station, idx) {
        updateStations(song, station)
    }
    async function onAddNewStation() {
        const element = document.querySelector('.create-modal')
        element.style.display = 'none'
        console.log(song)
        const station = {
            createdBy: { _id: 'user132', fulname: 'User', imgUrl: song.imgUrl },
            likedByUsers: ["{minimal-user}", "{minimal-user}"],
            name: song.title,
            songs: [(song)],
            tags: [],
            _id: makeId()
        }
        await addNewStation(station)
    }
    
    if (!stations) return

    return <article className="more-modal">
        <ul key={'modal-container'}>
            <li key={'add'} onMouseOver={onOpenStations} className="add-to-playlist"><svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" ><path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z" ></path></svg>Add to playlist</li>
            <li key={'save'} onMouseOver={onCLoseStations}><svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16"><path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path><path d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75z"></path> </svg>Save to Liked Songs</li>
            <li key={'artist'} onMouseOver={onCLoseStations}><svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" ><path d="M11.757 2.987A4.356 4.356 0 0 0 7.618 0a4.362 4.362 0 0 0-4.139 2.987 5.474 5.474 0 0 0-.22 1.894 5.604 5.604 0 0 0 1.4 3.312l.125.152a.748.748 0 0 1-.2 1.0128l-2.209 1.275A4.748 4.748 0 0 0 0 14.857v1.142h8.734A5.48 5.48 0 0 1 8.15 14.5H1.517a3.245 3.245 0 0 1 1.6-2.454l2.21-1.275a2.25 2.25 0 0 0 .6-3.386l-.128-.153a4.112 4.112 0 0 1-1.05-2.44A4.053 4.053 0 0 1 4.89 3.47a2.797 2.797 0 0 1 1.555-1.713 2.89 2.89 0 0 1 3.293.691c.265.296.466.644.589 1.022.12.43.169.876.144 1.322a4.12 4.12 0 0 1-1.052 2.44l-.127.153a2.239 2.239 0 0 0-.2 2.58c.338-.45.742-.845 1.2-1.173 0-.162.055-.32.156-.447l.126-.152a5.598 5.598 0 0 0 1.4-3.312 5.499 5.499 0 0 0-.218-1.894zm3.493 3.771a.75.75 0 0 0-.75.75v3.496h-1a2.502 2.502 0 0 0-2.31 1.542 2.497 2.497 0 0 0 1.822 3.406A2.502 2.502 0 0 0 16 13.502V7.508a.75.75 0 0 0-.75-.75zm-.75 6.744a.998.998 0 0 1-1.707.707 1 1 0 0 1 .707-1.706h1v1z"></path></svg>Go to artist</li>
            <li key={'album'} onMouseOver={onCLoseStations}><svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" ><path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path><path d="M8 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM5 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0z"></path></svg>Go to album</li>
        </ul>
        <div className="stations-modal" key={'stations-modal'}>
            <ul>
                <li onClick={onAddNewStation}><svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" ><path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z" ></path></svg>New playlist</li>
                {stations.filter(station => station.tags).map((station, idx) => <li key={idx} onClick={() => onAddToPlaylst(station, idx)}>{station.name}</li>)}
            </ul>
        </div>
    </article>
}