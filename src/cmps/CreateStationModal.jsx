import { useSelector } from "react-redux"
import { addNewStation, addStation } from "../store/actions/station.actions"
import { makeId } from "../services/util.service"
import { Navigate, useNavigate } from "react-router"
import { Link } from "react-router-dom"
export function CreateStationModal() {
    const stations = useSelector(storeState => storeState.stationModule.stations)
    const navigate = useNavigate()
    var count = 0
    async function onAddNewStation() {
        const element = document.querySelector('.create-modal')
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
    const targetElement = document.querySelector('.create-modal')
    function clickOutsideListener(event) {
        count++
        if(!targetElement) return
        if (!targetElement.contains(event.target) && count == 2) {
            count = 0
            // Click outside the target element 
            targetElement.style.display = 'none'
            // Do something here, such as closing a modal, hiding a dropdown, etc.
        }
    }

    // Adding click event listener to the document
    document.addEventListener('click', clickOutsideListener);
    return <article className="create-modal">
        <ul key={'modal-container'}>
            <li onClick={onAddNewStation}><svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" ><path d="M2 0v2H0v1.5h2v2h1.5v-2h2V2h-2V0H2zm11.5 2.5H8.244A5.482 5.482 0 0 0 7.966 1H15v11.75A2.75 2.75 0 1 1 12.25 10h1.25V2.5zm0 9h-1.25a1.25 1.25 0 1 0 1.25 1.25V11.5zM4 8.107a5.465 5.465 0 0 0 1.5-.593v5.236A2.75 2.75 0 1 1 2.75 10H4V8.107zM4 11.5H2.75A1.25 1.25 0 1 0 4 12.75V11.5z"></path></svg>Create a new playlist</li>
            <li  ><svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" ><path d="M1.75 1A1.75 1.75 0 0 0 0 2.75v11.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0 0 16 14.25v-9.5A1.75 1.75 0 0 0 14.25 3H7.82l-.65-1.125A1.75 1.75 0 0 0 5.655 1H1.75zM1.5 2.75a.25.25 0 0 1 .25-.25h3.905a.25.25 0 0 1 .216.125L6.954 4.5h7.296a.25.25 0 0 1 .25.25v9.5a.25.25 0 0 1-.25.25H1.75a.25.25 0 0 1-.25-.25V2.75z"></path></svg>Create a playlist folder</li>
        </ul>
    </article>
}