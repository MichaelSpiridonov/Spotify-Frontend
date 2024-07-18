import { TopicPreview } from "../cmps/TopicPreview"


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


    return <section className="search-page" >
        <h1>Browse All</h1>
        <section className="topics-container">
            {topics.map(topic => <TopicPreview key={topic.name} topic={topic} />)}
        </section>

    </section>
}