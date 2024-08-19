import { httpService } from '../http.service'
export const spotifyService = {
    getVideos,
}

async function getVideos() {
    return await httpService.get(`youtube`)
}