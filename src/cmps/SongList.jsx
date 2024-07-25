import { useSelector } from 'react-redux';
import { loadStation, setCurrSelectedStation, updateSongIdx } from '../store/actions/station.actions';
import { SongPreview } from './SongPreview'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { stationService } from '../services/station'
export function SongList({ songs, onAddTo, onClickPlay }) {
  const currSelectedStation = useSelector((storeState) => storeState.stationModule.currSelectedStation)
  async function onDragEnd(result) {
    const { destination, source} = result
    console.log(result)
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return
      const [removed] = songs.splice(source.index, 1);
      songs.splice(destination.index, 0, [removed][0]);
      updateSongIdx(songs, currSelectedStation)
  }

  if(!songs) return
  return (
    <>
    <DragDropContext onDragEnd={onDragEnd}>
      {songs.map((song, index) => (
      <Droppable droppableId={song._id} className='item'>
      {(provided, snapshot) => (
        <div
        {...provided.droppableProps}
        ref={provided.innerRef}
      >
          <Draggable key={song._id} draggableId={song._id} index={index} className='item'>
            {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <section className='item'>
                      <SongPreview key={song._id} song={song} onAddTo={onAddTo} onClickPlay={onClickPlay} className='item' />
                      </section>
                    </div>
                  )}
                </Draggable>
                {provided.placeholder}
            </div>
            )}
        </Droppable>
      ))}
      </DragDropContext>
    </>

  )
}
