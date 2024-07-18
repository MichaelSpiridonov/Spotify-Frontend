import { storageService } from '../async-storage.service'
import { loadFromStorage, saveToStorage } from '../util.service'

const STORAGE_KEY = 'station'

_createStations()

export const stationService = {
  query,
  getById,
  remove,
}
window.cs = stationService

async function query() {
  var stations = await storageService.query(STORAGE_KEY)
  return stations
}

function getById(stationId) {
  return storageService.get(STORAGE_KEY, stationId)
}

async function remove(stationId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, stationId)
}

function _createStations() {
  let stations = loadFromStorage(STORAGE_KEY)
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
      },
      {
        id: '_4gUVl5pjps',
        title: '21 Savage - ball w/o you',
        url: 'https://www.youtube.com/watch?v=_4gUVl5pjps',
        imgUrl: 'https://i.ytimg.com/vi/_4gUVl5pjps/mqdefault.jpg',
        addedBy: {},
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
      },
      {
        id: '_4gUVl5pjps',
        title: '21 Savage - ball w/o you',
        url: 'https://www.youtube.com/watch?v=_4gUVl5pjps',
        imgUrl: 'https://i.ytimg.com/vi/_4gUVl5pjps/mqdefault.jpg',
        addedBy: 162521765264,
      },
      {
        id: 'r8GXHS4s9K4',
        title: 'Lady Gaga & Beyoncé - Telephone',
        url: 'https://www.youtube.com/watch?v=r8GXHS4s9K4',
        imgUrl: 'https://i.ytimg.com/vi/r8GXHS4s9K4/mqdefault.jpg',
        addedAt: 162521765266,
      },
    ],
  }
  if (!stations || stations.length) {
    stations = []
    stations.push(station)
    stations.push(station2)
  }
  saveToStorage(STORAGE_KEY, stations)
}
