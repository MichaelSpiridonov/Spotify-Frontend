import { Routes, Route } from 'react-router'
import { useEffect } from 'react'

import { StationIndex } from './pages/StationIndex.jsx'
import { StationDetails } from './pages/StationDetails.jsx'
import { AppPlayer } from './cmps/AppPlayer.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { SearchPage } from './pages/SearchPage.jsx'
import { LikeSongsDeatils } from './pages/LikedSongDetails.jsx'
import { SideLayout } from './cmps/SideLayout.jsx'
import { Login } from './pages/Login.jsx'
import { LibraryPhone } from './pages/LibraryPhone.jsx'
import { PlayerPhoneDetails } from './pages/PlayerPhoneDetails.jsx'
import { AlbumDetails } from './pages/AlbumDetails.jsx'
import { Lyrics } from './pages/Lyrics.jsx'
import { login } from './store/actions/user.actions.js'

export function RootCmp() {
  useEffect(() => {
    login({ username: 'mike', password: 'mike'})
  })
  return (
    <div >
      <main className='main-container '>
        <SideLayout/>
        <Routes>
          <Route path='/' element={<StationIndex />} />
          <Route path='/station/:stationId' element={<StationDetails />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/likedSongs' element={<LikeSongsDeatils />} />
          <Route path='/library' element={<LibraryPhone />} />
          <Route path='/login' element={<Login />} />
          <Route path='/player' element={<PlayerPhoneDetails />} />
          <Route path='/album/:albumId' element={<AlbumDetails />} />
          <Route path='/lyrics' element={<Lyrics />} />
        </Routes>
        <AppPlayer />
      </main>
      <UserMsg />

    </div>
  )
}
