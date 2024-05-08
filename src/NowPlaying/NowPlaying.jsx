import React, { useEffect, useState, useContext } from "react";
import { usePlayer } from "../hooks/usePlayer";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Container from "../Container/Container";

const Loading = () => {
  return <></>;
};

const MediaPlayerContent = ({ currentShow }) => {
  return (
    <>
      <img src={currentShow?.image} width={50} height={50} />
      {currentShow?.title}
      <audio controls preload="none" key={currentShow?.title}>
        <source src={currentShow?.url} type="audio/mpeg"></source>
      </audio>
    </>
  );
};

export const NowPlaying = ({}) => {
  const [currentShow, setCurrentShow] = useState();
  useEffect(() => {});
  return (
    <div className="main-container">
      <Container setCurrentUrl={setCurrentShow} />
      <div className="media-player">
        {currentShow ? (
          <MediaPlayerContent currentShow={currentShow} />
        ) : (
          <Loading />
        )}
      </div>
      NowPlaying
    </div>
  );
};
