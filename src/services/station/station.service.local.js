import {
  storageService
} from '../async-storage.service'
import spotifyService from '../spotify.service'
import {
  loadFromStorage,
  makeId,
  saveToStorage
} from '../util.service'

const STATIONS_KEY = 'stations'
const ALBUMS_KEY = 'albums'
const LIKED_SONGS = 'likedsongs'
const ARTISTS_KEY = 'artist'
const SPOTIFY_CACHE = 'spDB'
//_createStations()
/* if (!localStorage.getItem(ALBUMS_KEY) && !localStorage.getItem(STATIONS_KEY) && !localStorage.getItem(ARTISTS_KEY)) {
  _createSpotifyStations()
} */
/* reateSpotifyStations()_c */
let gSongsCache = loadFromStorage(SPOTIFY_CACHE) || {}

export const stationService = {
  query,
  getById,
  remove,
  save,
  addToLikedSongs,
  queryAlbums,
  getTracks
}
window.cs = stationService

async function query() {
  console.log('hi')
  var stations = await storageService.query(STATIONS_KEY)
  return stations
}
async function queryAlbums() {
  var albums = await storageService.query('albums')
  return albums
}
function getById(stationId) {
  return storageService.get(STATIONS_KEY, stationId)
}

async function remove(stationId) {
  await storageService.remove(STATIONS_KEY, stationId)
}
async function save(station) {
  var savedStation
  if(station._id) {
    savedStation = await storageService.put(STATIONS_KEY, station)
  }else {
    savedStation = await storageService.post(STATIONS_KEY, station)
  }
  return savedStation
}

async function addToLikedSongs(likedSongs) {
  await storageService.post(LIKED_SONGS, likedSongs)
}

async function getTracks(searchVal) {
  if(!searchVal){
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
/* async function _createSpotifyStations() {
  let stations = loadFromStorage(STATIONS_KEY);
  let albums = loadFromStorage(ALBUMS_KEY);
  let artists = loadFromStorage(ARTISTS_KEY);
  const artistSet = new Set();

  if (!stations || !stations.length) {
    stations = [];
    albums = [];
    artists = []
    const playlists = await spotifyService.getPlaylists();

    const stationPromises = Object.entries(playlists).map(async ([category, categoryPlaylists]) => {
      const categoryStationPromises = categoryPlaylists.map(async playlist => {
        const tracks = await spotifyService.getTracks(playlist.id);
        const songs = await Promise.all(tracks.map(async track => {
          if (track) {
            track.artists.forEach(artist => artistSet.add(artist.id));

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
          }
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


    // Save tracks to local storage


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
        _id: 'dQw4w9WgXcQ',
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
        _id: '_4gUVl5pjps',
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
        _id: 'dQw4w9WgXcQ',
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
        _id: '_4gUVl5pjps',
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
        _id: 'r8GXHS4s9K4',
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
        _id: 'Sis_JJZoAfQ',
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
        _id: 'A4pasf5ci8s',
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
        _id: 'Trv80iyv8qs',
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
        _id: 'iT6MEoRywDY',
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
  }

  if (!albums || !albums.length) {
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

  // if(!artists || !artists.length) {
  //   const uniqueArtistIds = Array.from(artistSet);
  //   artists = await spotifyService.getArtists(uniqueArtistIds);

  //   const artistAlbumPromises = uniqueArtistIds.map(async artistId => {
  //     const artistAlbums = await spotifyService.getArtistAlbums(artistId);

  //     const albumDetailsPromises = artistAlbums.map(async album => {
  //       const tracks = await spotifyService.getAlbumTracks(album.id);
  //       const songs = await Promise.all(tracks.map(track => {
  //         return {
  //           _id: track.id,
  //           title: track.name,
  //           duration: track.duration_ms,
  //           isExplicit: track.explicit,
  //           artists: track.artists,
  //           imgUrl: track.album.images[0]?.url,
  //           albumName: track.album.name,
  //           addedAt: new Date(track.album.release_date).getTime()
  //         };
  //       }));

  //       return {
  //         _id: album.id,
  //         name: album.name,
  //         imgUrl: album.images[0]?.url,
  //         songs: songs,
  //         releaseDate: album.release_date
  //       };
  //     });

  //     const artistAlbumsWithTracks = await Promise.all(albumDetailsPromises);

  //     return {
  //       _id: artistId,
  //       albums: artistAlbumsWithTracks
  //     };
  //   });

  //   const artistAlbums = await Promise.all(artistAlbumPromises);
  //   artists = artists.map(artist => {
  //     const artistAlbumData = artistAlbums.find(a => a._id === artist.id);
  //     return {
  //       ...artist,
  //       albums: artistAlbumData ? artistAlbumData.albums : []
  //     };
  //   });
  // }

  if (!localStorage.getItem(STATIONS_KEY)) {
    saveToStorage(STATIONS_KEY, stations);
    saveToStorage(ALBUMS_KEY, albums);
    //saveToStorage(ARTISTS_KEY, artists);
  }
} */