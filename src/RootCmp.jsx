import { Routes, Route } from 'react-router'

import { StationIndex } from './pages/StationIndex.jsx'
import { StationDetails } from './pages/StationDetails.jsx'
import { AppPlayer } from './cmps/AppPlayer.jsx'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { UserMsg } from './cmps/UserMsg.jsx'
import { SearchPage } from './pages/SearchPage.jsx'
import { LikeSongsDeatils } from './pages/LikedSongDetails.jsx'
import { SideLayout } from './cmps/sideLayout.jsx'
import { Login } from './pages/Login.jsx'
import { LibraryPhone } from './pages/LibraryPhone.jsx'
export function RootCmp() {
  const user = useSelector((storeState) => storeState.userModule.user)
  console.log(user)

  return (
    <div>
      <main className='main-container'>
        <SideLayout/>
        <Routes>
          <Route path='/' element={<StationIndex />} />
          <Route path='/station/:stationId' element={<StationDetails />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/likedSongs' element={<LikeSongsDeatils />} />
          <Route path='/library' element={<LibraryPhone />} />
        </Routes>
        <AppPlayer />
      </main>
      <UserMsg />

      {!user && (
        <div className='login-overlay'>
          <Login setIsLoggedIn={setIsLoggedIn} />
        </div>
      )}
    </div>
  )
}
