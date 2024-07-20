import { storageService } from '../async-storage.service'
import { loadFromStorage, saveToStorage } from '../util.service'

const STATIONS_KEY = 'stations'
const STATION_KEY = 'station'
const CURR_SONG = 'currSong'
_createStations()

export const stationService = {
  query,
  getById,
  remove,
  save,
  updateStations
}
window.cs = stationService

async function query() {
  var stations = await storageService.query(STATIONS_KEY)
  return stations
}

function getById(stationId) {
  return storageService.get(STATIONS_KEY, stationId)
}

async function remove(stationId) {
  // throw new Error('Nope')
  await storageService.remove(STATIONS_KEY, stationId)
}
async function updateStations(stations) {
  // throw new Error('Nope')
  console.log(stations)
  localStorage.setItem(STATIONS_KEY,JSON.stringify(stations))
  /* console.log(...stations)
  await storageService.post(STATIONS_KEY, ...stations) */
}
async function save(currSongId) {
  // throw new Error('Nope')
  console.log(currSongId)
  localStorage.removeItem(CURR_SONG)
  await storageService.post(CURR_SONG, currSongId)
}

function _createStations() {
  let stations = loadFromStorage(STATIONS_KEY)
  const station = {
    _id: '5cksxjas89xjsa8xjsa8jxs09',
    name: "Or's Playlist",
    tags: ['Funk', 'Happy', 'Rap', 'Pop'],
    createdBy: {
      _id: 'u101',
      fullname: 'Or Barcha',
      imgUrl: 'https://i.ytimg.com/vi/_4gUVl5pjps/mqdefault.jpg',
    },
    likedByUsers: ['{minimal-user}', '{minimal-user}'],
    songs: [
      {
        id: 'dQw4w9WgXcQ',
        title: 'Rick Astley - Never Gonna Give You Up',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        imgUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
        addedBy: '{minimal-user}',
        likedBy: ['{minimal-user}'],
        addedAt: 162521765262,
        duration: 212000,
      },
      {
        id: '_4gUVl5pjps',
        title: '21 Savage - ball w/o you',
        url: 'https://www.youtube.com/watch?v=_4gUVl5pjps',
        imgUrl: 'https://i.ytimg.com/vi/_4gUVl5pjps/mqdefault.jpg',
        addedBy: {},
        duration: 193000,
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
      imgUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
    },
    likedByUsers: ['{minimal-user}', '{minimal-user}'],
    songs: [
      {
        id: 'dQw4w9WgXcQ',
        title: 'Rick Astley - Never Gonna Give You Up',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        imgUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
        addedBy: '{minimal-user}',
        likedBy: ['{minimal-user}'],
        addedAt: 162521765262,
        duration: 212000,
      },
      {
        id: '_4gUVl5pjps',
        title: '21 Savage - ball w/o you',
        url: 'https://www.youtube.com/watch?v=_4gUVl5pjps',
        imgUrl: 'https://i.ytimg.com/vi/_4gUVl5pjps/mqdefault.jpg',
        addedBy: 162521765264,
        duration: 193000,
      },
      {
        id: 'r8GXHS4s9K4',
        title: 'Lady Gaga & Beyoncé - Telephone',
        url: 'https://www.youtube.com/watch?v=r8GXHS4s9K4',
        imgUrl: 'https://i.ytimg.com/vi/r8GXHS4s9K4/mqdefault.jpg',
        addedAt: 162521765266,
        duration: 220000,
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
      imgUrl: 'https://i.ytimg.com/vi/iT6MEoRywDY/mqdefault.jpg',
    },
    likedByUsers: ['{minimal-user}', '{minimal-user}'],
    songs: [
      {
        id: 'Sis_JJZoAfQ',
        title: 'Juice WRLD - Cigarettes',
        url: 'https://www.youtube.com/watch?v=Sis_JJZoAfQ',
        imgUrl: 'https://i.ytimg.com/vi/Sis_JJZoAfQ/mqdefault.jpg',
        addedAt: 162521765266,
        duration: 220000,
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
      },
      {
        id: 'Trv80iyv8qs',
        title: 'Juice WRLD - High and Alone ',
        url: 'https://www.youtube.com/watch?v=Trv80iyv8qs',
        imgUrl: 'https://i.ytimg.com/vi/Trv80iyv8qs/mqdefault.jpg',
        addedAt: 162521765264,
        duration: 193000,
      },
      {
        id: 'iT6MEoRywDY',
        title: 'Juice WRLD - Rockstar In His Prime',
        url: 'https://www.youtube.com/watch?v=iT6MEoRywDY',
        imgUrl: 'https://i.ytimg.com/vi/iT6MEoRywDY/mqdefault.jpg',
        addedAt: 162521765266,
        duration: 220000,
      },
    ],
  }
  if (!stations || stations.length) {
    stations = []
    stations.push(station)
    stations.push(station2)
    stations.push(station3)
  }
  if(localStorage.getItem(STATIONS_KEY)) return
  saveToStorage(STATIONS_KEY, stations)
}
