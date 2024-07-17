import { stationService } from '../../services/station'
import { store } from '../store'
import { ADD_STATION, REMOVE_STATION, SET_STATIONS, SET_STATION, UPDATE_STATION, ADD_STATION_MSG } from '../reducers/station.reducer'

export async function loadStations(filterBy) {
    try {
        const Stations = await stationService.query(filterBy)
        store.dispatch(getCmdSetStations(Stations))
    } catch (err) {
        console.log('Cannot load Stations', err)
        throw err
    }
}

export async function loadStation(StationId) {
    try {
        const Station = await stationService.getById(StationId)
        store.dispatch(getCmdSetStation(Station))
    } catch (err) {
        console.log('Cannot load Station', err)
        throw err
    }
}


export async function removeStation(StationId) {
    try {
        await stationService.remove(StationId)
        store.dispatch(getCmdRemoveStation(StationId))
    } catch (err) {
        console.log('Cannot remove Station', err)
        throw err
    }
}

export async function addStation(Station) {
    try {
        const savedStation = await stationService.save(Station)
        store.dispatch(getCmdAddStation(savedStation))
        return savedStation
    } catch (err) {
        console.log('Cannot add Station', err)
        throw err
    }
}

export async function updateStation(Station) {
    try {
        const savedStation = await stationService.save(Station)
        store.dispatch(getCmdUpdateStation(savedStation))
        return savedStation
    } catch (err) {
        console.log('Cannot save Station', err)
        throw err
    }
}

export async function addStationMsg(StationId, txt) {
    try {
        const msg = await stationService.addStationMsg(StationId, txt)
        store.dispatch(getCmdAddStationMsg(msg))
        return msg
    } catch (err) {
        console.log('Cannot add Station msg', err)
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
function getCmdUpdateStation(station) {
    return {
        type: UPDATE_STATION,
        station
    }
}
function getCmdAddStationMsg(msg) {
    return {
        type: ADD_STATION_MSG,
        msg
    }
}

