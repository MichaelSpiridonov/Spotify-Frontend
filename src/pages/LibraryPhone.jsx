import { useEffect, useLayoutEffect, useState } from 'react'
import { loadStations } from '../store/actions/station.actions'

import { useSelector } from 'react-redux'

import { StationList } from '../cmps/StationList'
import { CreateStationModal } from '../cmps/CreateStationModal'
import { AppHeader } from '../cmps/AppHeader'
export function LibraryPhone() {
    const stations = useSelector(storeState => storeState.stationModule.stations)
    const currSong = useSelector(
        (storeState) => storeState.stationModule.currSong
      )
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
    const elPlayer = document.querySelector('.app-player')
    if (elPlayer&& currSong) {
      elPlayer.style.display = 'flex'
    }else if(elPlayer&&pageWidth < 500){
       elPlayer.style.display = 'none'
    }
    // Adding click event listener to the document
    document.addEventListener('click', clickOutsideListener);
    if(!stations) return
    return (
        <section className='Phone-library'>
                   
            <AppHeader/>
            <section className='phone-library-header'>
                <div>
                    <h1>Your Library</h1>
                </div>
                <svg onClick={onOpenModal}  className='phone-add-svg' data-encore-id='icon' role='img' aria-hidden='true' viewBox='0 0 16 16'><path d='M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z'></path></svg>
            </section>
            <StationList stations={stations} />
            <CreateStationModal />
        </section>
    )
}