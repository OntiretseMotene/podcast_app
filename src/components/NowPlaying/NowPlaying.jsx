import React, { useEffect, useState, useContext, useRef} from "react";
import { usePlayer } from "../../hooks/usePlayer";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Container from "../Container/Container";


const Loading = () => {
  return <></>;
}

const MediaPlayerContent = ({ currentShow }) => {
  const audioRef = useRef(null)
  const title = currentShow.title

 useEffect(()=> {
  const showProgress = {}
    console.log (audioRef.current.currentTime)
    showProgress[currentShow.title] = audioRef.current.currentTime

    const listeningHistory = JSON.parse(localStorage.getItem("listeningProgress"))||{}
    
    localStorage.setItem("listeningProgress", JSON.stringify({...listeningHistory, ...showProgress}))
  
 }, [audioRef.current?.paused])
  return (
    <>
      <img src={currentShow?.image} width={50} height={50} />
      {currentShow?.title}
      <audio controls preload="none" key={currentShow?.title} ref={audioRef}>
        <source src={currentShow?.url} type="audio/mpeg"></source>
      </audio>
      <p>{audioRef.current?.paused}</p>
      <button onClick={()=> {audioRef.current?.play()}}></button>
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
