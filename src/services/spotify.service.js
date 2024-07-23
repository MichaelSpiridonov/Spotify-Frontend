import axios from 'axios';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_API_CLIENTID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_API_SECRET;
const AUTH_URL = 'https://accounts.spotify.com/api/token';
const BASE_URL = 'https://api.spotify.com/v1';

const getToken = async () => {
  const response = await axios.post(AUTH_URL, null, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
    },
    params: {
      grant_type: 'client_credentials'
    }
  });
  return response.data.access_token;
};

const spotifyService = {
  getPlaylists: async () => {
    const token = await getToken();
    const featuredPlaylistsPromise = axios.get(`${BASE_URL}/browse/featured-playlists`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const newReleasesPromise = axios.get(`${BASE_URL}/browse/new-releases`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const categoriesPromise = axios.get(`${BASE_URL}/browse/categories`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const [featuredPlaylistsResponse, newReleasesResponse, categoriesResponse] = await Promise.all([
      featuredPlaylistsPromise,
      newReleasesPromise,
      categoriesPromise
    ]);

    const playlists = {
      featured: featuredPlaylistsResponse.data.playlists.items,
      newReleases: newReleasesResponse.data.albums.items,
      categories: categoriesResponse.data.categories.items
    };
    return playlists;
  },

  getArtist: async (artistId) => {
    const token = await getToken();
    const response = await axios.get(`${BASE_URL}/artists/${artistId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  },

  getTracks: async (playlistId) => {
    const token = await getToken();
    const response = await axios.get(`${BASE_URL}/playlists/${playlistId}/tracks`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.items.map(item => item.track);
  },

  getAlbumTracks: async (albumId) => {
    const token = await getToken();
    const response = await axios.get(`${BASE_URL}/albums/${albumId}/tracks`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.items
  }
};

export default spotifyService;
