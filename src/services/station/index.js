const { DEV, VITE_LOCAL } = import.meta.env

import { stationService as local } from './station.service.local'
import { stationService as remote } from './station.service.remote'

const service = VITE_LOCAL === 'true' ? local : remote
export const stationService = { ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local
console.log(stationService)
if (DEV) window.stationService = stationService
