import React, { useState } from 'react'
import Home from './Home'
import NowPlaying from './NowPlaying'
import Favourites from './Favourites'
import History from './History'

export const Container = () => {
    const [page, setPage] = useState("home")
    const variable= 5; 

    const pages = {
        home: <Home count={variable} />,
        nowPlaying: <NowPlaying />,
        favourites: <Favourites />,
        history: <History />
    };

    return (
        <>
            {pages[page]}
        </>
    );
};