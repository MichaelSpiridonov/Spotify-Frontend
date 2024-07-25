import { SongPreview } from './SongPreview'

export function SongList({ songs, onAddTo, onClickPlay }) {
  if(!songs) return
  return (
    <>
      {songs.map((song) => (
            <section key={song._id} className='item'>
                <SongPreview key={song._id} song={song} onAddTo={onAddTo} onClickPlay={onClickPlay} />
            </section>
          ))}
    </>

  )
}
