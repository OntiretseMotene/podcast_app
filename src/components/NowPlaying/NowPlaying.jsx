import React, { useEffect, useState, useContext, useRef } from "react";
import { usePlayer } from "../../hooks/usePlayer";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Container from "../Container/Container";
import ReactAudioPlayer from "react-audio-player";

let audioRef;

const Loading = () => {
  const [Loading, setLoading] = useState(false);

  return <></>;
};

const MediaPlayerContent = ({ currentShow }) => {
  const [src, setSrc] = useState("");
  const title = currentShow.title;
  console.log(currentShow);

  setInterval(() => {
    setSrc(currentShow?.url);
  }, 100);
  return (
    <div className="media-player">
      <img src={currentShow?.image} width={50} height={40} />
      <p>{currentShow?.title}</p>
      {/* <audio controls preload="none" key={currentShow?.title} ref={audioRef}>
        <source src={currentShow?.url} type="audio/mpeg"></source>
      </audio> */}
      <ReactAudioPlayer
        id={currentShow?.title}
        ref={(element) => {
          audioRef = element;
        }}
        src={src}
        controls
        listenInterval={1000}
        onListen={() => {
          localStorage.setItem(
            "listening-history",
            JSON.stringify({
              title: audioRef.audioEl.current.currentTime,
            })
          );
        }}
        onLoadedMetadata={() => {
          console.log("metaData");
        }}
      />
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
