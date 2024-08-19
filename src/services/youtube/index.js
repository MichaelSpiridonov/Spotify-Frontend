const { DEV, VITE_LOCAL } = import.meta.env

import { youtubeService as local } from './youtube.service.local'
import { youtubeService as remote } from './youtube.service.remote'

const service = VITE_LOCAL === 'true' ? local : remote
export const youtubeService = { ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local
if (DEV) window.youtubeService = youtubeService
