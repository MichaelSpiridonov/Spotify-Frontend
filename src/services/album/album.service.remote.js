import { httpService } from '../http.service'

export const stationService = {
    getById,
    queryAlbums
}

async function queryAlbums() {
    return await httpService.get(`album`)
}
async function getById(albumId) {
    return await httpService.get(`album/${albumId}`)
}


