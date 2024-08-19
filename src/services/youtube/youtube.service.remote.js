import { httpService } from '../http.service'
export const youtubeService = {
    getVideos,
}

async function getVideos() {
    return await httpService.get(`youtube`)
}