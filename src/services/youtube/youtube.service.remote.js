import { httpService } from '../http.service'
export const youtubeService = {
    getVideos,
}

async function getVideos(query) {
    return await httpService.get(`youtube/${query}`)
}