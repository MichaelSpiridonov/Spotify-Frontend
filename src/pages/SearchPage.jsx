import { useEffect, useState } from "react"
import { TopicPreview } from "../cmps/TopicPreview"
import { getVideos } from "../services/youtube.service"
import { SongPreview } from "../cmps/SongPreview"


const topics = [
    {
        name: 'Music',
        img: 'https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb'
    }
    ,
    {
        name: 'Podcast',
        img: 'https://i.scdn.co/image/ab6765630000ba8a81f07e1ead0317ee3c285bfa'
    }
    ,
    {
        name: 'New Releases',
        img: 'https://i.scdn.co/image/ab67fb8200005caf194fec0fdc197fb9e4fe8e64'
    }
    ,
    {
        name: 'Pop',
        img: 'https://i.scdn.co/image/ab67fb8200005caf66d545e6a69d0bfe8bd1e825'
    }
    ,
    {
        name: 'Latin',
        img: 'https://i.scdn.co/image/ab67fb8200005caf3a44e7ae3d808c220898185c'
    }
    ,
    {
        name: 'Rock',
        img: 'https://i.scdn.co/image/ab67fb8200005cafda4c849095796a9e5d2c4ddb'
    },
    {
        name: 'Hip-Hop',
        img: 'https://i.scdn.co/image/ab67fb8200005caf5f3752b3234e724f9cd6056f'
    }
    ,
    {
        name: 'Indie',
        img: 'https://i.scdn.co/image/ab67fb8200005cafa1a252e3a815b65778d8c2aa'
    }
    ,
    {
        name: 'Workout',
        img: 'https://i.scdn.co/image/ab67fb8200005caf6af6d83c78493644c9b0627b'
    }
    ,
    {
        name: 'K-pop',
        img: 'https://i.scdn.co/image/ab67fb8200005caf4b42030ee01cf793663dbb73'
    }
]

export function SearchPage() {
    const [search, setSearch] = useState("")
    const [songs, setSongs] = useState([])
    useEffect(() => {
       getVideos(search).then(videos=> setSongs(videos))
    }, [search])
    function handleChange({ target }) {
        setSearch(target.value)
    }
    return <section className="search-page" >
        <form action="">
            <label htmlFor=""><svg className="icon" data-encore-id="icon" role="img" aria-hidden="true" /* class="Svg-sc-ytk21e-0 bneLcE search-icon QbaKKdcHNA2x3_YJvpYu" */ viewBox="0 0 24 24"><path d="M10.533 1.27893C5.35215 1.27893 1.12598 5.41887 1.12598 10.5579C1.12598 15.697 5.35215 19.8369 10.533 19.8369C12.767 19.8369 14.8235 19.0671 16.4402 17.7794L20.7929 22.132C21.1834 22.5226 21.8166 22.5226 22.2071 22.132C22.5976 21.7415 22.5976 21.1083 22.2071 20.7178L17.8634 16.3741C19.1616 14.7849 19.94 12.7634 19.94 10.5579C19.94 5.41887 15.7138 1.27893 10.533 1.27893ZM3.12598 10.5579C3.12598 6.55226 6.42768 3.27893 10.533 3.27893C14.6383 3.27893 17.94 6.55226 17.94 10.5579C17.94 14.5636 14.6383 17.8369 10.533 17.8369C6.42768 17.8369 3.12598 14.5636 3.12598 10.5579Z"></path></svg></label>
            <input onChange={handleChange} value={search} placeholder="What do you want to play?" type="text" />
        </form> 
        {search !== null && <h1>Songs</h1>}
        {search === "" && <section>
            <h1>Browse All</h1>
            <section className="topics-container">
                {topics.map(topic => <TopicPreview key={topic.name} topic={topic} />)}
            </section>
        </section>}
        {search && songs.map(song => <SongPreview key={song.videoId} song={song}/> )
        }

    </section>
}