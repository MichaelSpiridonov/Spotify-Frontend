import { httpService } from '../http.service'
export const spotifyService = {
    getPlaylists,
    searchTracks,
    getArtist,
    getArtistAlbums,
    getArtists,
    getTracks,
    getAlbum
}

async function getPlaylists() {
    return await httpService.get(`spotify/playlist`)
}
async function getTracks(playlistId) {
    return await httpService.get(`spotify/track/${playlistId}`)
}
async function searchTracks(query) {
    return await httpService.get(`spotify/tracks/${query}`)
}
async function getArtists() {
    return await httpService.get(`spotify/artists`)
}
async function getArtist(artistId) {
    return await httpService.get(`spotify/artist/${artistId}`)
}
async function getArtistAlbums(artistIds) {
    return await httpService.get(`spotify/artist/album/${artistIds}`)
}
async function getAlbum(albumId) {
    return await httpService.get(`spotify/album/${albumId}`)
}