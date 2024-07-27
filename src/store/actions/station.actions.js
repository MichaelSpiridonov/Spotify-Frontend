import { store } from '../store'
import {
    ADD_STATION,
    REMOVE_STATION,
    SET_STATIONS,
    SET_STATION,
    UPDATE_SONG,
    REMOVE_SONG,
    UPDATE_LIKED_SONGS,
    UPDATE_STATIONS,
    SET_CURR_SELECTED_STATION,
    SET_CURR_SELECTED_SONG,
    UPDATE_SONG_IDX,
    SET_CURR_STATION,
    UPDATE_STATION,
} from '../reducers/station.reducer'
import { stationService } from '../../services/station'

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
export async function updateStations(song, station, idx) {
    try {
        await station.songs.push(song)
        await stationService.save(station)
        store.dispatch(getCmdUpdateStations({ station, idx }))
    } catch (err) {
        console.log('Cannot save Station', err)
        throw err
    }
}

export async function removeStation(station) {
    try {
        await stationService.remove(station._id)
        store.dispatch(getCmdRemoveStation(station._id))
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

export async function updateStation(station) {
    try {
        const savedStation = await stationService.save(station)
        store.dispatch(getCmdUpdateStation(savedStation))
        return savedStation
    } catch (err) {
        console.log('Cannot add Station', err)
        throw err
    }
}

export async function updateSong(song) {
    try {
        store.dispatch(getCmdUpdateSongStation(song))
        return song
    } catch (err) {
        console.log('Cannot save Station', err)
        throw err
    }
}


export async function setCurrSelectedSong(song) {
    try {
        store.dispatch(getCmdsetCurrSelectedSong(song))
    } catch (err) {
        console.log('Cannot load Song', err)
        throw err
    }
}

export async function setCurrSelectedStation(station) {
    try {
        store.dispatch(getCmdSetSelectedStation(station))
    } catch (err) {
        console.log('Cannot load Station', err)
        throw err
    }
}

export async function setCurrStation(station) {
    try {
        store.dispatch(getCmdSetCurrStation(station))
    } catch (err) {
        console.log('Cannot load Station', err)
        throw err
    }
}

export async function removeSong(songId, station) {
    try {
        var updateSongs = station.songs.filter(song => song._id !== songId)
        station.songs = updateSongs
        await stationService.save(station)
        store.dispatch(getCmdRemoveSong(songId, station))
        return station
    } catch (err) {
        console.log('Cannot remove Song', err)
        throw err
    }
}

export async function updateSongIdx(songs, station) {
    try {
        console.log('Songs', songs)
        console.log('station:',station.songs);
        station.songs = songs
        await stationService.save(station)
        store.dispatch(getCmdUpdateSongIdx(songs))
    }catch (err) {
        throw err
    }
}


export async function addToLikedSongs(likedsong) {
    let songs = []
    try {
        let prevLikedsongs = JSON.parse(localStorage.getItem('likedsongs')) || ''
        console.log(prevLikedsongs[0])
        if (prevLikedsongs) {
            console.log(prevLikedsongs.songs)
            songs = [prevLikedsongs[0].songs, likedsong]
        } else {
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
            songs: songs,
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
function getCmdUpdateStations(stations, idx) {
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
function getCmdUpdateStation(station) {
    return {
        type: UPDATE_STATION,
        station,
    }
}
function getCmdUpdateSongStation(song) {
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
function getCmdRemoveSong(songId, station) {
    return {
        type: REMOVE_SONG,
        songId,
        station
    }
}

function getCmdUpdateSongIdx(songs) {
    return {
        type: UPDATE_SONG_IDX,
        songs
    }
}

function getCmdSetSelectedStation(station) {
    return {
        type: SET_CURR_SELECTED_STATION,
        station,
    }
}

function getCmdsetCurrSelectedSong(song) {
    return {
        type: SET_CURR_SELECTED_SONG,
        song
    }
}

function getCmdSetCurrStation(station) {
    return {
        type: SET_CURR_STATION,
        station,
    }
}
// function getCmdUpdateLikedSongs(likedSongs) {
//   return {
//     type: UPDATE_LIKED_SONGS,
//     likedSongs,
//   }
// }
