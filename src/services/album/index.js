const { DEV, VITE_LOCAL } = import.meta.env

import { albumService as local } from './album.service.local'
import { albumService as remote } from './album.service.remote'

const service = VITE_LOCAL === 'true' ? local : remote
export const albumService = { ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.albumService = albumService
