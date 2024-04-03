import React, { useEffect, useState, useContext } from "react";
import { usePlayer } from "../hooks/usePlayer";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Container from "../Container/Container";
export const NowPlaying = ({}) => {
  const [currentShow, setCurrentShow] = useState({});
  const [currentUrl, setCurrentUrl] = useState("");
  const getSingleShow = (id) => {
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then((data) => data.json())
      .then((show) => {
        setCurrentShow(show);
      });
  };
  useEffect(() => getSingleShow(currentUrl), [currentUrl]); //change currenturl to current id
  return (
    <div className="main-container">
      <Container setCurrentUrl={setCurrentUrl} />
      <div className="media-player">
        {currentUrl}
        {currentShow?.title}
        {currentShow?.description}
        {currentShow?.seasons?.length}
      </div>
      NowPlaying
    </div>
  );
};
