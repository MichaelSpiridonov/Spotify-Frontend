import { httpService } from '../http.service'

export const stationService = {
    queryStations,
    getById,
    save,
    remove,
    queryAlbums
}

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

async function save(station) {
    var savedStation
    if (station._id) {
        savedStation = await httpService.put(`station/${station._id}`, station)
    } else {
        savedStation = await httpService.post('station', station)
    }
    return savedStation
}
