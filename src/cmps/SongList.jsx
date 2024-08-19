import { useSelector } from 'react-redux'
import { updateSongIdx } from '../store/actions/station.actions'
import { SongPreview } from './SongPreview'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useState } from 'react'
export function SongList({ songs, onAddTo, onClickPlay }) {
  const currStation = useSelector(
    (storeState) => storeState.stationModule.currStation
  )
  const [songList, setSongList] = useState(songs)
  async function onDragEnd(result) {
    const { destination, source } = result
    if (!destination) return
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return
    const [removed] = songs.splice(source.index, 1)
    songs.splice(destination.index, 0, [removed][0])
    setSongList(songs)
    updateSongIdx(songs, currStation)
  }
  if (!songList) return
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        {songList.map((song, index) => (
          <Droppable
            key={song.id || song._id}
            droppableId={song._id || song.id}
            className='item'
          >
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <Draggable
                  key={song._id || song.id}
                  draggableId={song._id || song.id}
                  index={index}
                  className='item'
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <section
                        className={song.track_number ? 'album-item' : 'item'}
                      >
                        <SongPreview
                          albumImg={currStation?.imgUrl}
                          key={song._id || song.id}
                          song={song}
                          onAddTo={onAddTo}
                          onClickPlay={onClickPlay}
                        />
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
