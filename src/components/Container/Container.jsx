import React, { useState, useEffect } from "react";
import { Home } from "../Home";
import NowPlaying from "../NowPlaying";
import Favourites from "../Favourites";
import History from "../History";
import Filters from "../Filters";

export const Container = ({ setCurrentUrl }) => {
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState("home");
  const [allShows, setAllShows] = useState([]);

  const filterShows = (query) => {
    if (!query) return setShows(allShows);
    if (isNaN(query)) {
      const filteredShows = allShows.filter((show) => {
        const upperCaseTitle = show.title.toUpperCase();
        return upperCaseTitle.includes(query.toUpperCase());
      });
      setShows(filteredShows);
    } else {
      const filteredShows = allShows.filter((show) => {
        return show.genres.includes(query);
      });
      setShows(filteredShows);
    }
  };

  const sortShows = (query) => {
    //sort shows functionality. get show titles in an array, sort function to list A-Z or Z-A set show to new sorted list
    const queryType = {
      "A-Z": () =>
        setShows(
          [...shows].sort((show1, show2) =>
            show1.title > show2.title ? 1 : -1
          )
        ),
      "Z-A": () =>
        setShows(() =>
          [...shows].sort((show1, show2) =>
            show1.title < show2.title ? 1 : -1
          )
        ),
      Ascending: () => {
        setShows(
          [...shows].sort((show1, show2) =>
            new Date(show1.updated) > new Date(show2.updated) ? 1 : -1
          )
        );
      },

      Descending: () =>
        setShows(
          [...shows]
            .sort((show1, show2) =>
              new Date(show1.updated) > new Date(show2.updated) ? 1 : -1
            )
            .reverse()
        ),
    };
    queryType[query]();
  };

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then((data) => data.json())
      .then((allShows) => {
        setShows(allShows);
        setAllShows(allShows);
        setPage("home");
      })
      .catch((error) => {
        console.error("Error fetching shows:", error);
      });
  }, []);

  const pages = {
    home: <Home shows={shows} setCurrentlyPlaying={setCurrentUrl} />, //passing the getSigleShows function to home
    favourites: <Favourites />,
    history: <History />,
  };

  return (
    <>
      {/* <NowPlaying currentShow={{}}> */}
      <Filters sortShows={sortShows} filterShows={filterShows} />
      <button onClick={() => setPage("home")}>Home</button>
      <button onClick={() => sortShows("A-Z")}>Search</button>
      <button onClick={() => setPage("favourites")}>Favourites</button>
      <button onClick={() => setPage("history")}>History</button>
      {pages[page]}
      {/* </NowPlaying> */}
    </>
  );
};

export default Container;
