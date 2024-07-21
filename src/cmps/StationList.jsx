import { StationPreview } from './StationPreview'

export function StationList({ stations }) {
  return (
    <section className='station-list'>
      {stations.map((station) => (
        <StationPreview key={station._id} station={station} />
      ))}
    </section>
  )
}
