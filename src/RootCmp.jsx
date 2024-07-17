import React from 'react'
import { Routes, Route } from 'react-router'

import { StationIndex } from './pages/StationIndex.jsx'

import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'

export function RootCmp() {
    return (
        <div className="main-container">
            <AppHeader />
            <UserMsg />

            <main>
                <Routes>
                    <Route path="/" element={<StationIndex />} />
                </Routes>
            </main>
        </div>
    )
}


