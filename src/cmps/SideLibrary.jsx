import { useEffect, useState } from 'react'
import { loadStations } from '../store/actions/station.actions'
import { StationList } from './StationList'
import { useSelector } from 'react-redux'
import { CreateStationModal } from './CreateStationModal'
import { Loading } from './Loading'

export function SideLibrary() {
    const stations = useSelector(storeState => storeState.stationModule.stations)
    const [isCollapsed,setIsCollapsed] = useState(false)
    useEffect(() => {
        loadStations()
            .catch(err => {
                showErrorMsg('Cannot load stations!')
                throw err
            })
    }, []) 
    var count = 0
    function onOpenModal(event){
            const x = event.clientX 
            const y = event.clientY +20 
            console.log(`Clicked at X=${x}, Y=${y}`)
            const element = document.querySelector('.create-modal')
            element.style.left = `${x}px`
            element.style.top = `${y}px`
            element.style.display = 'block'
            event.stopPropagation();
    }
    const targetElement = document.querySelector('.create-modal')
    function clickOutsideListener(event) {
        if(!targetElement) return
        if (!targetElement.contains(event.target)) {
            // Click outside the target element 
            targetElement.style.display = 'none'
            
            // Do something here, such as closing a modal, hiding a dropdown, etc.
        }
    }
    function onToogleCollapsed(){
     var isOpen  = isCollapsed? false :true
        setIsCollapsed(isOpen)
    }
    if(document.querySelector('.main-container')){

        if(isCollapsed === true){
            const elMain =document.querySelector('.main-container')

            /*  elMain.classList.remove('.main-container') */
            elMain.classList.add('.main-container-collapsed') 
        }else {
            const elMain =document.querySelector('.main-container')

            /*  elMain.classList.remove('.main-container') */
            elMain.classList.remove('.main-container-collapsed') 
        }
        // Adding click event listener to the document
    }
    document.addEventListener('click', clickOutsideListener);
    if(!stations) return <Loading/>
    return (
        <section className='side-library'>
            <section onClick={onToogleCollapsed} className='library-header'>
                <div>
                   {!isCollapsed? <svg className='library-svg' data-encore-id='icon' role='img' aria-hidden='true' viewBox='0 0 24 24' ><path d='M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z'></path></svg>:<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" className='library-svg'><path d="M14.5 2.134a1 1 0 0 1 1 0l6 3.464a1 1 0 0 1 .5.866V21a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V3a1 1 0 0 1 .5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zm6 0a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1z"></path></svg>} 
                    <h1>Your Library</h1>
                </div>
                <svg onClick={onOpenModal}  className='add-svg' data-encore-id='icon' role='img' aria-hidden='true' viewBox='0 0 16 16'><path d='M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z'></path></svg>
            </section>
            <StationList stations={stations} />
            <CreateStationModal />
        </section>
    )
}