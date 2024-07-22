import { store } from '../store'
import {
    ADD_STATION,
    REMOVE_STATION,
    SET_STATIONS,
    SET_STATION,
    UPDATE_SONG,
    UPDATE_LIKED_SONGS,
    UPDATE_STATIONS
} from '../reducers/station.reducer'
import { stationService } from '../../services/station/station.service.local'

export async function loadStations() {
    try {
        const Stations = await stationService.query()
        store.dispatch(getCmdSetStations(Stations))
    } catch (err) {
        console.log('Cannot load Stations', err)
        throw err
    }
}

export async function loadStation(stationId) {
    try {
        const Station = await stationService.getById(stationId)
        store.dispatch(getCmdSetStation(Station))
    } catch (err) {
        console.log('Cannot load Station', err)
        throw err
    }
}
export async function updateStations(song,station,idx) {
    console.log(station)
    try {
        const Station = await stationService.getById(station._id)
        console.log(Station)
       /*  const Stations = await stationService.updateStations(song) */
        /* Stations[idx].songs.push(song) */
        /* console.log(Stations) */
        stationService.updateStations(station) 
        station.songs.push(song)
        store.dispatch(getCmdUpdateStations({station,idx}))
    } catch (err) {
        console.log('Cannot save Station', err)
        throw err
    }
}
export async function addNewStation(station) {
    try {
        const Stations = await stationService.query()
        Stations.push(station)
        console.log(Stations)
        stationService.updateStations(Stations)
        store.dispatch(getCmdSetStations(Stations))
    } catch (err) {
        console.log('Cannot save Station', err)
        throw err
    }
}


export async function removeStation(stationId) {
    try {
        await stationService.remove(stationId)
        store.dispatch(getCmdRemoveStation(stationId))
    } catch (err) {
        console.log('Cannot remove Station', err)
        throw err
    }
}

export async function addStation(station) {
    try {
        const savedStation = await stationService.save(station)
        store.dispatch(getCmdAddStation(savedStation))
        return savedStation
    } catch (err) {
        console.log('Cannot add Station', err)
        throw err
    }
}

export async function updateSong(song) {
    try {
        const savedSong = await stationService.save(song)
        store.dispatch(getCmdUpdateStation(song))
        return savedSong
    } catch (err) {
        console.log('Cannot save Station', err)
        throw err
    }
}

export async function addToLikedSongs(likedsong) {
    let songs = []
    try {
        let prevLikedsongs = JSON.parse(localStorage.getItem('likedsongs')) || ''
        console.log(prevLikedsongs[0])
        if(prevLikedsongs){
            console.log(prevLikedsongs.songs)
             songs =[...prevLikedsongs[0].songs , likedsong]
        } else{
            songs.push(likedsong)
        }
        console.log(songs)
        const likedSongsStation = {
            _id: 'dseq31kigrq9419wqdt',
            name: 'Liked Songs',
            createdBy: {
                _id: 'u666',
                fullname: 'Liked Songs',
                imgUrl:
                    'https://res.cloudinary.com/dvubhdy64/image/upload/v1721520195/spotify/kkjpfxtcj9xetuqaeg0q.png',
            },
            songs:songs,
        }
        console.log(likedSongsStation)
        localStorage.removeItem('likedsongs')
        stationService.addToLikedSongs(likedSongsStation)

        store.dispatch(getCmdSetLikedSongs(likedSongsStation))
    } catch (err) {
        console.log('Cannot add to Liked Songs', err)
        throw err
    }
}
// Command Creators:
function getCmdSetStations(stations) {
    return {
        type: SET_STATIONS,
        stations,
    }
}
function getCmdUpdateStations(stations,idx) {
    return {
        type: UPDATE_STATIONS,
        stations,
    }
}

function getCmdSetStation(station) {
    return {
        type: SET_STATION,
        station,
    }
}
function getCmdRemoveStation(stationId) {
    return {
        type: REMOVE_STATION,
        stationId,
    }
}
function getCmdAddStation(station) {
    return {
        type: ADD_STATION,
        station,
    }
}
function getCmdUpdateStation(song) {
    return {
        type: UPDATE_SONG,
        song,
    }
}
function getCmdSetLikedSongs(likedSongs) {
    return {
        type: UPDATE_LIKED_SONGS,
        likedSongs,
    }
}

// function getCmdUpdateLikedSongs(likedSongs) {
//   return {
//     type: UPDATE_LIKED_SONGS,
//     likedSongs,
//   }
// }
