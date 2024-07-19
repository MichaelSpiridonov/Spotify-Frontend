
import { store } from '../store'
import { ADD_STATION, REMOVE_STATION, SET_STATIONS, SET_STATION, UPDATE_SONG } from '../reducers/station.reducer'
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
        console.log(song)
        const savedSong = await stationService.save(song)
        store.dispatch(getCmdUpdateStation(song))
        return savedSong
    } catch (err) {
        console.log('Cannot save Station', err)
        throw err
    }
}


// Command Creators:
function getCmdSetStations(stations) {
    return {
        type: SET_STATIONS,
        stations
    }
}
function getCmdSetStation(station) {
    return {
        type: SET_STATION,
        station
    }
}
function getCmdRemoveStation(stationId) {
    return {
        type: REMOVE_STATION,
        stationId
    }
}
function getCmdAddStation(station) {
    return {
        type: ADD_STATION,
        station
    }
}
function getCmdUpdateStation(song) {
    return {
        type: UPDATE_SONG,
        song
    }
}
