/* eslint-disable no-case-declarations */
export const SET_STATIONS = 'SET_STATIONS'
export const SET_STATION = 'SET_STATION'
export const REMOVE_STATION = 'REMOVE_STATION'
export const ADD_STATION = 'ADD_STATION'
export const UPDATE_SONG = 'UPDATE_SONG'
export const REMOVE_SONG = 'REMOVE_SONG'
export const ADD_STATION_MSG = 'ADD_STATION_MSG'
export const UPDATE_LIKED_SONGS = 'UPDATE_LIKED_SONGS'
export const UPDATE_STATIONS = 'UPDATE_STATIONS'
export const SET_CURR_CLICKED_STATION = 'SET_CURR_CLICKED_STATION'
const initialState = {
    stations: [],
    station: null,
    currSong: null,
    currClickedStation: null,
    likedSongs: JSON.parse(localStorage.getItem('likedsongs')) || null,
    currStation: null
}

export function stationReducer(state = initialState, action) {
    var newState = state
    var stations
    var station
    console.log(action)
    switch (action.type) {
        case SET_STATIONS:
            newState = { ...state, stations: action.stations }
            break
        case UPDATE_STATIONS:
            const stationIdx = state.stations.findIndex(
                (station) => station._id === action.stations.station._id )
                console.log(stationIdx)
                station = action.stations.station
             stations = state.stations
             stations[stationIdx] = station
            newState = { ...state , stations: stations }
            break
        case SET_STATION:
            newState = { ...state, station: action.station }
            break
        case REMOVE_STATION:
            const lastRemovedStation = state.stations.find(
                (station) => station._id === action.stationId
            )
            stations = state.stations.filter(
                (station) => station._id !== action.stationId
            )
            newState = { ...state, stations, lastRemovedStation }
            break
        case ADD_STATION:
            newState = { ...state, stations: [...state.stations, action.station] }
            break
        case UPDATE_SONG:
            newState = { ...state, currSong: action.song }
            break
        case REMOVE_SONG:
            const lastRemovedSong = state.station.songs.find(
                (song) => song._id === action.stationId
            )
            station = state.station.songs.filter(
                (song) => song._id !== action.songId
            )
            newState = { ...state, station, lastRemovedSong }

            case SET_CURR_CLICKED_STATION:
            newState = { ...state, currClickedStation: action.station }
            break


        case ADD_STATION_MSG:
            newState = {
                ...state,
                station: {
                    ...state.station,
                    msgs: [...(state.station.msgs || []), action.msg],
                },
            }
            break

        case UPDATE_LIKED_SONGS: // Handle updating liked songs
            newState = { ...state, likedSongs: action.likedSongs }
            break

        default:
    }
    return newState
}

// unitTestReducer()
