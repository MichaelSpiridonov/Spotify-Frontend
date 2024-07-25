import { SongPreview } from './SongPreview'

export function SongList({ songs, onAddTo, onClickPlay }) {
  if(!songs[0]) return
  return (
    <>
      {songs.map((song) => (
            <section key={song._id} className='item'>
                <SongPreview key={song.title} song={song} onAddTo={onAddTo} onClickPlay={onClickPlay} />
            </section>
          ))}
    </>

  )
}
