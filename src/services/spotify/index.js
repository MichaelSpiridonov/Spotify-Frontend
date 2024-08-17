const { DEV, VITE_LOCAL } = import.meta.env

import { spotifyService as local } from './spotify.service.local'
import { spotifyService as remote } from './spotify.service.remote'

const service = VITE_LOCAL === 'true' ? local : remote
export const spotifyService = { ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.spotifyService = spotifyService
