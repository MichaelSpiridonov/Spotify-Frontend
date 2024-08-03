
export function StationIndex() {
    const [pageWidth, setPageWidth] = useState(window.innerWidth)
    useEffect(() => {
        const handleResize = () => {
            setPageWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
    }, [pageWidth])
    
    switch (pageWidth > 500) {
        case (pageWidth < 1250):
            numElements = 3
            break
        case (pageWidth < 1420):
            numElements = 4
            break
        case (pageWidth < 1750):
            numElements = 5
            break
        case (pageWidth < 1970):
            numElements = 6
            break
        case (pageWidth < 2250):
            numElements = 7
            break
        case (pageWidth > 2250):
            numElements = 8
            break
    }

    var numWides = 6
    if (pageWidth < 500) {
        numWides = 4
        numElements = 8
    }

    return <section className='list-container'>
        <AppHeader />
        <section className='wide-stations-container'>
            {stations.slice(8, 8 + numWides).map((station) => (
                <WideStationPreview key={station._id} station={station} />
            ))}
        </section>
        <h1 className='title-category'>Featured</h1>
        <section className='home-container'>
            {stationFeatured.slice(0, numElements).map((station) => (
                <StationIndexPreview key={station._id} station={station} />
            ))}
        </section>
    </section>
}


