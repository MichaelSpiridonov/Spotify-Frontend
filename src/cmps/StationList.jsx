import { useSelector } from 'react-redux'
import { LikeSongsPreview } from './LikedSongsPreview'
import { StationPreview } from './StationPreview'

export function StationList({ stations }) {
  const likedSongs = useSelector(storeState => storeState.stationModule.likedSongs)
  return (
    <section className='station-list'>
      {likedSongs && <LikeSongsPreview/>}
      {stations.map((station) => (
        <StationPreview key={station._id} station={station} />
      ))}
    </section>
  )
}
