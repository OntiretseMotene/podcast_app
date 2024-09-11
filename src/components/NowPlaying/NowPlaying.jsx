import React, { useEffect, useState, useContext, useRef } from "react";
import { usePlayer } from "../../hooks/usePlayer";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Container from "../Container/Container";
import ReactAudioPlayer from "react-audio-player";

const Loading = () => {
  const [Loading, setLoading] = useState(false);

  return <></>;
};

const MediaPlayerContent = ({ currentShow }) => {
  const title = currentShow.title;

  useEffect(() => {
    const showProgress = {};

    const listeningHistory =
      JSON.parse(localStorage.getItem("listeningProgress")) || {};

    localStorage.setItem(
      "listeningProgress",
      JSON.stringify({ ...listeningHistory, ...showProgress })
    );
  }, []);
  return (
    <div className="media-player">
      <img src={currentShow?.image} width={50} height={50} />
      <p>{currentShow?.title}</p>
      {/* <audio controls preload="none" key={currentShow?.title} ref={audioRef}>
        <source src={currentShow?.url} type="audio/mpeg"></source>
      </audio> */}
      <ReactAudioPlayer src={currentShow?.url} controls />
    </div>
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
