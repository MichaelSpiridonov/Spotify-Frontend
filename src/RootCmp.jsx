import { Routes, Route } from 'react-router'

import { StationIndex } from './pages/StationIndex.jsx'
import { StationDetails } from './pages/StationDetails.jsx'
import { AppPlayer } from './cmps/AppPlayer.jsx'

import { UserMsg } from './cmps/UserMsg.jsx'
import { SearchPage } from './pages/SearchPage.jsx'
import { LikeSongsDeatils } from './pages/LikedSongDetails.jsx'
import { SideLayout } from './cmps/sideLayout.jsx'
import { Login } from './pages/Login.jsx'
export function RootCmp() {
  return (
    <div>
      <main className='main-container'>
        <SideLayout/>
        <Routes>
          <Route path='/' element={<StationIndex />} />
          <Route path='/station/:stationId' element={<StationDetails />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/likedSongs' element={<LikeSongsDeatils />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        <AppPlayer />
      </main>
      <UserMsg />
    </div>
  )
}
