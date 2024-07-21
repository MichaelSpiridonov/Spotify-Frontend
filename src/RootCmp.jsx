import { Routes, Route } from 'react-router'

import { StationIndex } from './pages/StationIndex.jsx'
import { StationDetails } from './pages/StationDetails.jsx'
import { AppPlayer } from './cmps/AppPlayer.jsx'
import { Sidebar } from './cmps/Sidebar.jsx'

import { AppHeader } from './cmps/AppHeader.jsx'

import { UserMsg } from './cmps/UserMsg.jsx'
import { SideLibrary } from './cmps/sideLibrary.jsx'
import { SearchPage } from './pages/SearchPage.jsx'
import { MoreModal } from './cmps/MoreModal.jsx'
import { LikeSongsDeatils } from './pages/LikedSongDetails.jsx'
import { SideLayout } from './cmps/sideLayout.jsx'
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
        </Routes>
        <AppPlayer />
      </main>
      <UserMsg />
    </div>
  )
}
