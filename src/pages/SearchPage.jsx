import { useEffect, useLayoutEffect, useState } from 'react'
import { TopicPreview } from '../cmps/TopicPreview'
import { getVideos } from '../services/youtube.service'
import { SearchPreview } from '../cmps/SearchPreview'
import { AppHeader } from '../cmps/AppHeader'
import SearchIcon from '../assets/icons/search.svg?react';
import { stationService } from '../services/station/station.service.local'
import { MoreModal } from '../cmps/modals/MoreModal'
import { useSelector } from 'react-redux'


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
    },
    {
        name: 'Mood',
        img: 'https://i.scdn.co/image/ab67fb8200005cafe542e9b59b1d2ae04b46b91c'
    },
    {
        name: 'Elctronic',
        img: 'https://i.scdn.co/image/ab67fb8200005caf26ada793217994216c79dad8'
    },
    {
        name: 'Country',
        img: 'https://i.scdn.co/image/ab67fb8200005cafd10a5fb6da973e53e9d17ab9'
    },
    {
        name: 'Chill',
        img: 'https://i.scdn.co/image/ab67fb8200005caf330ca3a3bfaf8b18407fb33e'
    },
    {
        name: 'metal',
        img: 'https://i.scdn.co/image/ab67fb8200005cafefa737b67ec51ec989f5a51d'
    },
    {
        name: 'Anime',
        img: 'https://i.scdn.co/image/ab67fb8200005cafca4acfcf1f94feff4d080cc9'
    },
    {
        name: 'Classical',
        img: 'https://i.scdn.co/image/ab67fb8200005caf4597370d1058e1ec3c1a56fa'
    },
    {
        name: 'Travel',
        img: 'https://i.scdn.co/image/ab67fb8200005caf879a886d22672d9b5b987746'
    },
    {
        name: 'Afro',
        img: 'https://i.scdn.co/image/ab67fb8200005caf73b2872e5a04da17bee68535'
    },
    {
        name: 'Summer',
        img: 'https://i.scdn.co/image/ab67fb8200005caf097a46192e6bb67e52cdff60'
    },
    {
        name: 'Glow',
        img: 'https://i.scdn.co/image/ab67fb8200005caf50cfe3fbd3a9fb8810da45ea'
    },
    {
        name: 'Blues',
        img: 'https://i.scdn.co/image/ab67fb8200005caf53eb5d52ae9152ce8461b387'
    },
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
    
   
]

export function SearchPage() {
    const [search, setSearch] = useState('')
    const [songs, setSongs] = useState([])
    const [pageWidth, setPageWidth] = useState(window.innerWidth)
    const currSong = useSelector(
        (storeState) => storeState.stationModule.currSong
      )

    useLayoutEffect(() => {
      // Function to handle resize event
      const handleResize = () => {
        setPageWidth(window.innerWidth)
      }
  
      // Attach resize event listener
      window.addEventListener('resize', handleResize)
  
      // Clean up function
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [pageWidth])
    useEffect(() => {
        if (search) {
            stationService.getTracks(search).then(songs => setSongs(songs))
        }
    }, [search])
    function handleChange({ target }) {
        setSearch(target.value)
    }

    const elPlayer = document.querySelector('.app-player')
  if (elPlayer&& currSong) {
    elPlayer.style.display = 'flex'
  }else if(pageWidth < 500){
     elPlayer.style.display = 'none'
  }
    return <section className='search-page' >
        <AppHeader />
        <form action=''>
            <label htmlFor=''><SearchIcon /></label>
            <input onChange={handleChange} value={search ? search : ''} placeholder='What do you want to play?' type='text' />
        </form>
        {search !== '' && <h1 className='search-title'>Songs</h1>}
        {search === '' && <section>
            <h1 className='search-title'>Browse All</h1>
            <section className='topics-container'>
                {topics.map(topic => <TopicPreview key={topic.name} topic={topic} />)}
            </section>
        </section>}
        <section className='station-details' >
            {search && songs.map(song => <SearchPreview key={song._id} song={song} />)}
            <MoreModal />
        </section>

    </section>
}