import {
  storageService
} from '../async-storage.service'
import spotifyService from '../spotify.service'
import {
  loadFromStorage,
  saveToStorage
} from '../util.service'

const STATIONS_KEY = 'stations'
const ALBUMS_KEY = 'albums'
const CURR_SONG = 'currSong'
const LIKED_SONGS = 'likedsongs'
const STATION_KEY = 'station'
//_createStations()
_createSpotifyStations()

export const stationService = {
  query,
  getById,
  remove,
  save,
  updateStations,
  addToLikedSongs,
  addNewStation,
  getMyStations
}
window.cs = stationService

async function query() {
  var stations = await storageService.query(STATIONS_KEY)
  return stations
}
async function getMyStations(){
  var stations = await storageService.query(STATION_KEY)
  return stations
}
function getById(stationId) {
  return storageService.get(STATIONS_KEY, stationId)
}

async function remove(stationId) {
  // throw new Error('Nope')
  await storageService.remove(STATIONS_KEY, stationId)
}
async function updateStations(station) {
  // throw new Error('Nope')
  console.log(station)
  await storageService.put(STATIONS_KEY, station)
  /* localStorage.setItem(STATIONS_KEY, JSON.stringify(stations)) */
  /* console.log(...stations)
  await storageService.post(STATIONS_KEY, ...stations) */
}
async function addNewStation(station) {
  // throw new Error('Nope')
  console.log(station)
  await storageService.post(STATIONS_KEY, station)
  /* localStorage.setItem(STATIONS_KEY, JSON.stringify(stations)) */
  /* console.log(...stations)
  await storageService.post(STATIONS_KEY, ...stations) */
}
async function save(currSongId) {
  // throw new Error('Nope')
  await storageService.post(CURR_SONG, currSongId)
}
async function addToLikedSongs(likedSongs) {
  console.log(likedSongs)

  await storageService.post(LIKED_SONGS, likedSongs)
}


async function _createSpotifyStations() {
  let stations = loadFromStorage(STATIONS_KEY);
  let albums = loadFromStorage(ALBUMS_KEY);

  if (!stations || !stations.length || albums || !albums.length) {
    stations = [];
    albums = [];
    const playlists = await spotifyService.getPlaylists();
    const stationPromises = Object.entries(playlists).map(async ([category, categoryPlaylists]) => {
      const categoryStationPromises = categoryPlaylists.map(async playlist => {
        const tracks = await spotifyService.getTracks(playlist.id);
        const songs = await Promise.all(tracks.map(async track => {
          return {
            _id: track.id,
            title: track.name,
            duration: track.duration_ms,
            isExplicit: track.explicit,
            artists: track.artists,
            imgUrl: track.album.images[0].url,
            albumName: track.album.name,
            addedAt: new Date(track.album.release_date).getTime()
          };
        }));

        return {
          _id: playlist.id,
          name: playlist.name,
          description: playlist.description,
          imgUrl: playlist.images[0].url,
          songs: songs,
          createdBy: {
            _id: playlist.owner.id,
            fullname: playlist.owner.display_name,
            imgUrl: playlist.images[0].url,
          },
          category: category // Add the category to each station object
        };
      });

      return Promise.all(categoryStationPromises);
    });

    stations = (await Promise.all(stationPromises)).flat();
    const station = {
      _id: '5cksxjas89xjsa8xjsa8jxs09',
      name: "Or's Playlist",
      tags: ['Funk', 'Happy', 'Rap', 'Pop'],
      createdBy: {
        _id: 'u101',
        fullname: 'Or Barcha',
        imgUrl: 'https://i.scdn.co/image/ab67616d00001e0215ebbedaacef61af244262a8',
      },
      likedByUsers: ['{minimal-user}', '{minimal-user}'],
      songs: [{
          id: 'dQw4w9WgXcQ',
          title: 'Rick Astley - Never Gonna Give You Up',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          imgUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
          addedBy: '{minimal-user}',
          likedBy: ['{minimal-user}'],
          addedAt: 162521765262,
          duration: 212000,
          artists: [{
            id: "7lwdlhwSxbB36wqnOwo5Kd",
            name: "Rick Astley",
            type: "artist",
          }],
          albumName: 'Album',
        },
        {
          id: '_4gUVl5pjps',
          title: '21 Savage - ball w/o you',
          url: 'https://www.youtube.com/watch?v=_4gUVl5pjps',
          imgUrl: 'https://i.ytimg.com/vi/_4gUVl5pjps/mqdefault.jpg',
          addedBy: {},
          duration: 193000,
          artists: [{
            id: "uhughyfyvviiyviyviy",
            name: "21 Savage",
            type: "artist",
          }],
          albumName: 'Album',
        },
      ],
    }
    const station2 = {
      _id: '134431feqfq3141rfe1e1fe1fe1',
      name: "Amit's Playlist",
      tags: ['Funk', 'Happy'],
      createdBy: {
        _id: 'u101',
        fullname: 'Amit Gal',
        imgUrl: 'https://i.scdn.co/image/ab67616d00001e02280689ecc5e4b2038bb5e4bd',
      },
      likedByUsers: ['{minimal-user}', '{minimal-user}'],
      songs: [{
          id: 'dQw4w9WgXcQ',
          title: 'Rick Astley - Never Gonna Give You Up',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          imgUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
          addedBy: '{minimal-user}',
          likedBy: ['{minimal-user}'],
          addedAt: 162521765262,
          duration: 212000,
          artists: [{
            id: "7lwdlhwSxbB36wqnOwo5Kd",
            name: "Rick Astley",
            type: "artist",
          }],
          albumName: 'Album',
        },
        {
          id: '_4gUVl5pjps',
          title: '21 Savage - ball w/o you',
          url: 'https://www.youtube.com/watch?v=_4gUVl5pjps',
          imgUrl: 'https://i.ytimg.com/vi/_4gUVl5pjps/mqdefault.jpg',
          addedBy: 162521765264,
          duration: 193000,
          artists: [{
            id: "7lwdlhwSxbB36wqnOwo5Kd",
            name: "21 Savage",
            type: "artist",
          }],
          albumName: 'Album',
        },
        {
          id: 'r8GXHS4s9K4',
          title: 'Lady Gaga & Beyoncé - Telephone',
          url: 'https://www.youtube.com/watch?v=r8GXHS4s9K4',
          imgUrl: 'https://i.ytimg.com/vi/r8GXHS4s9K4/mqdefault.jpg',
          addedAt: 162521765266,
          duration: 220000,
          artists: [{
              id: "7lwdlhwSxbB36wqnOwo5Kd",
              name: "Lady Gaga",
              type: "artist",
            },
            {
              id: 'feq991jreo012313',
              name: 'Beyoncé',
              type: 'artist'
            }
          ],
          albumName: 'Album',
        },
      ],
    }
    const station3 = {
      _id: 'dseq31kigrq9419sjdsa',
      name: "Michael's Playlist",
      tags: ['Funk', 'Happy'],
      createdBy: {
        _id: 'u101',
        fullname: 'Michael Spiridonov',
        imgUrl: 'https://i.scdn.co/image/ab67616d00001e027459992b444de38842b9bee7',
      },
      likedByUsers: ['{minimal-user}', '{minimal-user}'],
      songs: [{
          id: 'Sis_JJZoAfQ',
          title: 'Juice WRLD - Cigarettes',
          url: 'https://www.youtube.com/watch?v=Sis_JJZoAfQ',
          imgUrl: 'https://i.ytimg.com/vi/Sis_JJZoAfQ/mqdefault.jpg',
          likedBy: ['{minimal-user}'],
          addedAt: 162521765266,
          duration: 220000,
          artists: [{
            id: "7lwdlhwSxbB36wqnOwo5Kd",
            name: "Juice Wrld",
            type: "artist",
          }],
          albumName: 'Album',
        },
        {
          id: 'A4pasf5ci8s',
          title: 'Juice WRLD - Purple Potion',
          url: 'https://www.youtube.com/watch?v=A4pasf5ci8s',
          imgUrl: 'https://i.ytimg.com/vi/A4pasf5ci8s/mqdefault.jpg',
          addedBy: '{minimal-user}',
          likedBy: ['{minimal-user}'],
          addedAt: 162521765262,
          duration: 212000,
          artists: [{
            id: "7lwdlhwSxbB36wqnOwo5Kd",
            name: "Juice Wrld",
            type: "artist",
          }],
          albumName: 'Album',
        },
        {
          id: 'Trv80iyv8qs',
          title: 'Juice WRLD - High and Alone ',
          url: 'https://www.youtube.com/watch?v=Trv80iyv8qs',
          imgUrl: 'https://i.ytimg.com/vi/Trv80iyv8qs/mqdefault.jpg',
          likedBy: ['{minimal-user}'],
          addedAt: 162521765264,
          duration: 193000,
          artists: [{
            id: "7lwdlhwSxbB36wqnOwo5Kd",
            name: "Juice Wrld",
            type: "artist",
          }],
          albumName: 'Album',
        },
        {
          id: 'iT6MEoRywDY',
          title: 'Juice WRLD - Rockstar In His Prime',
          url: 'https://www.youtube.com/watch?v=iT6MEoRywDY',
          imgUrl: 'https://i.ytimg.com/vi/iT6MEoRywDY/mqdefault.jpg',
          likedBy: ['{minimal-user}'],
          addedAt: 162521765266,
          duration: 220000,
          artists: [{
            id: "7lwdlhwSxbB36wqnOwo5Kd",
            name: "Juice Wrld",
            type: "artist",
          }],
          albumName: 'Album',
        },
      ],
    }
    stations.push(station)
    stations.push(station2)
    stations.push(station3)

    const albumSongs = await spotifyService.getAlbums()
    const albumPromises = Object.entries(albumSongs).map(async ([category, categoryPlaylists]) => {
      const categoryAlbumPromises = categoryPlaylists.map(async album => {
        const tracks = await spotifyService.getAlbumTracks(album.id);
        const songs = await Promise.all(tracks.map(async track => {
          return {
            title: track.name,
            duration: track.duration_ms,
            isExplicit: track.explicit,
            artists: track.artists,
          };
        }));

        return {
          _id: album.id,
          name: album.name,
          imgUrl: album.images[2].url,
          songs: songs,
          releaseDate: album.release_date,
          category: category
        };
      })
      return Promise.all(categoryAlbumPromises);
    })

    albums = await Promise.all(albumPromises);
  }
  if (!localStorage.getItem(STATIONS_KEY)) {
    saveToStorage(STATIONS_KEY, stations);
    saveToStorage(ALBUMS_KEY, albums);
  }
}