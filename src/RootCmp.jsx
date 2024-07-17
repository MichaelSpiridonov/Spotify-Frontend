import React from 'react'
import { Routes, Route } from 'react-router'

import { StationIndex } from './pages/StationIndex.jsx'

import { UserMsg } from './cmps/UserMsg.jsx'

export function RootCmp() {
    return (
        <div >
            <main>
                <Routes>
                    <Route path="/home" element={<StationIndex />} />
                </Routes>
            </main>
            <UserMsg />
        </div>
    )
}


