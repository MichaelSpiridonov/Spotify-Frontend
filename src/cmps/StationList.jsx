import { StationPreview } from './StationPreview'

export function StationList({ stations }) {
  return (
    <section >
      {stations.map((station) => (
        <StationPreview key={station._id} station={station} />
      ))}
    </section>
  )
}
