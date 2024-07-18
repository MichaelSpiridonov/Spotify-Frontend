import { Routes, Route } from 'react-router'

import { StationIndex } from './pages/StationIndex.jsx'
import { AppPlayer } from './cmps/AppPlayer.jsx'
import { Sidebar } from './cmps/Sidebar.jsx'

import { AppHeader } from './cmps/AppHeader.jsx'

import { UserMsg } from './cmps/UserMsg.jsx'
import { SideLibrary } from './cmps/sideLibrary.jsx'

export function RootCmp() {
    return (
        <div >
            <main className="main-container">
            <AppHeader/>
            <Sidebar />
            <SideLibrary/>
                <Routes>
                    <Route path="/" element={<StationIndex />} />
                </Routes>
                <AppPlayer />
            </main>
            <UserMsg />
        </div>
    )
}


