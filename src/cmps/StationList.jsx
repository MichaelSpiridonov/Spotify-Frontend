import { useSelector } from 'react-redux'
import { LikeSongsPreview } from './LikedSongsPreview'
import { StationPreview } from './StationPreview'
import { StationModal } from './modals/StationModal'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { loadStations } from '../store/actions/station.actions';
import { stationService } from '../services/station';
import { useState } from 'react';

export function StationList() {
  const stations = useSelector((storeState) => storeState.stationModule.stations)
  const [stationList, setStationList] = useState(stations)
  function onDragEnd(result) {
    const { destination, source} = result
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return
      const [removed] = stations.splice(source.index, 1);
      stations.splice(destination.index, 0, [removed][0]);
      setStationList(stations)
      stationService.save(stations)
      loadStations()
  }
  
  const likedSongs = useSelector(storeState => storeState.stationModule.likedSongs)
  if(!stations) return
  console.log(stations)
  return (
    <section className='station-list'>
      {likedSongs && <LikeSongsPreview />}
      <DragDropContext onDragEnd={onDragEnd}>
      {stations.map((station, index) => (
      <Droppable droppableId={station._id} className='station-container'>
      {(provided, snapshot) => (
        <div
        {...provided.droppableProps}
        ref={provided.innerRef}
      >
          <Draggable key={station._id} draggableId={station._id} index={index}>
            {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <StationPreview key={station._id} station={station}/>
                    </div>
                  )}
                </Draggable>
                {provided.placeholder}
            </div>
            )}
        </Droppable>
      ))}
      </DragDropContext>
      <StationModal station={stations}/>
    </section>
  )
}
