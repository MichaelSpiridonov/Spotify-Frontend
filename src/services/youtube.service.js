import axios from "axios"
import { loadFromStorage, saveToStorage } from "./util.service"

const YT_API_KEY = import.meta.env.VITE_YT_API_KEY

const YOUTUBE_CACHE = 'ytDB'

const gVideosAmount = 5

let gYoutubeCache = loadFromStorage(YOUTUBE_CACHE) || {}

export function getVideos(searchVal) {
	if (gYoutubeCache[searchVal]) return Promise.resolve(gYoutubeCache[searchVal])

	const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${gVideosAmount}&videoEmbeddable=true&type=video&key=${YT_API_KEY}&q=music${searchVal}`
	return axios
		.get(url)
		.then(res => res.data.items)
		.then(videos => {console.log(videos)
			videos = videos.map(video => getVideoDetails(video))
			gYoutubeCache[searchVal] = videos
			saveToStorage(YOUTUBE_CACHE, gYoutubeCache)
			return videos
		})
}

export function getVideoDetails(video) {
	
	const { id, snippet } = video
	const { title, thumbnails } = snippet
	const videoId = id.videoId
	const thumbnail = thumbnails.default.url
	return { videoId, title, thumbnail }
}

export function getValidFormatWord(str) {
	let strArr = str.split('')
	let formatedArr = strArr.map(letter => {
		return letter === ' ' ? '_' : letter
	})
	return formatedArr.join('')
}

export function clearHistory() {
	gYoutubeCache = {}
	saveToStorage(YOUTUBE_CACHE, gYoutubeCache)
}

export function getKeywords() {
	return Object.keys(gYoutubeCache)
}
