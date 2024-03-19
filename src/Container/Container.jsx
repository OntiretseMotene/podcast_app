import React, { useState, useEffect } from "react";
import { Home } from "../Home";
import NowPlaying from "../NowPlaying";
import Favourites from "../Favourites";
import History from "../History";

export const Container = () => {
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState("home");
  const [currentlyPlaying, setCurrentlyPlaying] = useState("");

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then((data) => data.json())
      .then((allShows) => {
        setShows(allShows);
        setPage("home");
      })
      .catch((error) => {
        console.error("Error fetching shows:", error);
      });
  }, []);

  const pages = {
    home: <Home shows={shows} setCurrentlyPlaying={setCurrentlyPlaying} />, //passing the getSigleShows function to home
    favourites: <Favourites />,
    history: <History />,
  };

  return (
    <>
      <NowPlaying currentShow={{}}>
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("nowPlaying")}>Now Playing</button>
        <button onClick={() => setPage("favourites")}>Favourites</button>
        <button onClick={() => setPage("history")}>History</button>
        {pages[page]}
      </NowPlaying>
    </>
  );
};

export default Container;
