import { useLayoutEffect, useState } from 'react';
import { Sidebar } from './Sidebar';
import { SideLibrary } from './SideLibrary';
import { MenuPhone } from './MenuPhone';

export function SideLayout() {
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

    return <section className='side-layout-container'>

        <section className='side-layout'>
            {pageWidth > 500 && <Sidebar />}
            {pageWidth > 500 && <SideLibrary />}
        </section>
            {pageWidth < 500 && <MenuPhone />}
    </section>
}