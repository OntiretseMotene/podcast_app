import React, { useState, useEffect } from 'react'
import Home from '../Home'
import NowPlaying from '../NowPlaying'
import Favourites from '../Favourites'
import History from '../History'
import { Card } from '../Components/Card'
import styles from '../Container/'

export const Container = () => {
    const [shows, setShows] = useState([])
    const [currentShowId, setCurrentShowId] = useState("")
    const [page, setPage] = useState("home")

    useEffect(() => {
        fetch("https://podcast-api.netlify.app/shows")
          .then((data) => data.json())
          .then((allShows) => {
            setShows(allShows);
            setPage("home");
          })
          .catch((error) => {
            console.error("Error fetching shows:", error);
            // Handle the error (e.g., show an error message to the user)
          });
      }, []);

    const pages = {
        home: <Home />,
        nowPlaying: <NowPlaying />,
        favourites: <Favourites />,
        history: <History />
    };

    return (
        <>
            {pages[page]}
            <button onClick={() => setPage("home")}>Home</button > 
            <button onClick={() => setPage("nowPlaying")}>Now Playing</button>
            <button onClick={() => setPage("favourites")}>Favourites</button>
            <button onClick={() => setPage("history")}>History</button>

            {/* Render Cards based on fetched data */}
            {shows.map((shows) => (
                <li>
                  <img  style={{ position: 'sticky', top: 42 }} src={shows.image} alt='pic'></img>

                </li>
                
            ))}
        </>
  )
}

export default Container;
        