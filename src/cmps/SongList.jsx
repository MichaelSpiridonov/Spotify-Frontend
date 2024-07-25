import { SongPreview } from './SongPreview'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
export function SongList({ songs, onAddTo, onClickPlay }) {
  function onDragEnd(result) {
    const { destination, source} = result
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return
      const [removed] = songs.splice(source.index, 1);
      songs.splice(destination.index, 0, [removed][0]);
      setStations(songs)
  }

  if(!songs) return
  return (
    <>
      {songs.map((song) => (
            <section key={song._id} className='item'>
                <SongPreview song={song} onAddTo={onAddTo} onClickPlay={onClickPlay} />
            </section>
          ))}
    </>

  )
}
