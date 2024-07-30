import { storageService } from '../async-storage.service'
import { httpService } from '../http.service'
import spotifyService from '../spotify.service'
import { loadFromStorage, makeId, saveToStorage } from '../util.service'
const SPOTIFY_CACHE = 'spDB'
export const stationService = {
    queryStations,
    getById,
    save,
    remove,
    queryAlbums,
    getTracks
}
let gSongsCache = loadFromStorage(SPOTIFY_CACHE) || {}
async function queryStations() {
    return await httpService.get(`station`)
}
async function queryAlbums() {

    return await httpService.get(`album`)
}
async function getById(stationId) {
    return await httpService.get(`station/${stationId}`)
}

async function remove(stationId) {
    return await httpService.delete(`station/${stationId}`)
}
async function getTracks(searchVal) {
    if (!searchVal) {
        return
    }
    if (gSongsCache[searchVal]) {
        return Promise.resolve(gSongsCache[searchVal])
    }
    const tracks = await spotifyService.searchTracks(searchVal);
    console.log(tracks)
    const songs = await Promise.all(tracks.map(track => {
        return {
            imgUrl: track.album.images[0].url,
            artists: [track.artists[0].name],
            duration: track.duration_ms,
            title: track.name,
            _id: makeId(),
            albumName: track.album.name,
            releaseDate: track.album.release_date
        }
    }))
    gSongsCache[searchVal] = songs
    saveToStorage(SPOTIFY_CACHE, gSongsCache)
    storageService.post(SPOTIFY_CACHE, songs);
    return songs
}
async function save(station) {
    var savedStation
    if (station._id) {
        savedStation = await httpService.put(`station/${station._id}`, station)
    } else {
        savedStation = await httpService.post('station', station)
    }
    return savedStation
}
