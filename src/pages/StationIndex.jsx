import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { StationList } from '../cmps/StationList'
import { useSelector } from 'react-redux'
import { loadStations } from '../store/actions/station.actions'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { AppHeader } from '../cmps/AppHeader.jsx'
import { StationIndexPreview } from '../cmps/StationIndexPreview.jsx'
import { WideStationPreview } from '../cmps/WideStationPreview.jsx'
import ResizeObserver from 'resize-observer-polyfill'
export function StationIndex() {
    const stations = useSelector(
        (storeState) => storeState.stationModule.stations)
    var numElements = 0
    const [pageWidth, setPageWidth] = useState(window.innerWidth);

    useLayoutEffect(() => {
        // Function to handle resize event
        const handleResize = () => {
            setPageWidth(window.innerWidth);
        };

        // Attach resize event listener
        window.addEventListener('resize', handleResize);

        // Clean up function
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [pageWidth]); // Only run once on mount

    calculateNumberOfElements()
    function calculateNumberOfElements() {
        if (pageWidth < 1250) {
            numElements = 3
        }
        else if (pageWidth < 1420) {
            numElements = 4
        }
        else if (pageWidth < 1750) {
            numElements = 5
        }
        else if (pageWidth < 1970) {
            numElements = 6
        }
        else if (pageWidth < 2250) {
            numElements = 7
        }
        else if (pageWidth >2250) {
            numElements = 8
        }
    }
    if (!stations) return <div>Loading....</div>
    return (
        <section className='list-container'>
            <AppHeader />
            <section className='wide-albums-container'>
                {stations.slice(8, 16).map((station) => (
                    <WideStationPreview key={station._id} station={station} />
                ))}
            </section>
            <h1>Your shows</h1>
            <section className='home-container'>
                {stations.slice(0, numElements).map((station) => (
                    <StationIndexPreview key={station._id} station={station} />
                ))}
            </section>
        </section>
    )
}
