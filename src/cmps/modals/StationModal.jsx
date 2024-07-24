
import { removeStation, updateStations } from "../../store/actions/station.actions"
import { makeId } from "../../services/util.service"
import { addNewStation } from "../../store/actions/station.actions"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"

export function StationModal({ station }) {
    const stations = useSelector(storeState => storeState.stationModule.stations)
    const navigate = useNavigate()
    var count = 0
    async function onAddNewStation() {
        const element = document.querySelector('.station-modal')
        element.style.display = 'none'
        const station = {
            createdBy: { imgUrl: '' },
            likedByUsers: ["{minimal-user}", "{minimal-user}"],
            name: 'My playlist #' + stations.length,
            songs: [],
            tags: [],
            _id: makeId()
        }
        await addNewStation(station)
        navigate(`/station/${station._id}`)
    }
    function onRemoveStation(){
        console.log(station)
        removeStation(station._id)
    }
    const targetElement = document.querySelector('.station-modal')
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
    
    document.addEventListener('click', clickOutsideListener);
    return <article className="station-modal">
        <ul key={'modal-container'}>
            <li ><svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" ><path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z" ></path></svg>Edit details</li>
            <li onClick={()=> onRemoveStation(station)} ><svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16"><path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path><path d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75z"></path> </svg>Delete</li>
            <li onClick={onAddNewStation}  ><svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" ><path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path><path d="M8 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM5 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0z"></path></svg>Create playlist</li>
        </ul>
    </article>
}