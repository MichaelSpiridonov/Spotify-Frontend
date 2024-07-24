import { useSelector } from 'react-redux'
import { LikeSongsPreview } from './LikedSongsPreview'
import { StationPreview } from './StationPreview'
import { StationModal } from './modals/StationModal'

export function StationList({ stations }) {
  const likedSongs = useSelector(storeState => storeState.stationModule.likedSongs)
  if(!stations) return
  return (
    <section className='station-list'>
      {likedSongs && <LikeSongsPreview />}
      <section className='station-container'>
        {stations.map((station) => (
          <StationPreview key={station._id} station={station}/>
        ))}
      </section >
      <StationModal station={stations}/>
    </section>

  )
}
