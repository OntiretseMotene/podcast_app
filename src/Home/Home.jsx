import { useState, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Card } from "../presentation/Card";
import { usePlayer } from "../hooks/usePlayer";

const Preview = ({ currentShow, setCurrentlyPlaying }) => {
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
  // const url = currentShow.seasons[season].episodes[episode].file;

  return (
    <>
      <div className="show-preview"></div>
    </>
  );
};

export const Home = ({ shows, setCurrentlyPlaying }) => {
  const { setId, playerContext } = usePlayer();
  const [, setCurrentUrl] = useLocalStorage("currentUrl", ""); //passsing parameters(key and initialValue) to a function called useLocalStorage

  const [showPreview, setShowPreview] = useState(false);
  const [currentShow, setCurrentShow] = useState("");

  useEffect(() => {}, [shows]);
  return (
    <div className="grid-container">
      {showPreview ? (
        <Preview
          currentShow={currentShow}
          setCurrentlyPlaying={setCurrentlyPlaying}
        />
      ) : null}

      {shows.map((show, index) => (
        <li
          className="grid-item"
          key={index}
          onClick={() => {
            setShowPreview(true);
            setCurrentShow(show);
          }}
        >
          <Card
            cardImage={show.image}
            title={show.title}
            description={show.description}
            showid={show.id}
            genre={show.genres}
            seasons={show.seasons}
            date={show.updated}
          />
        </li>
      ))}
    </div>
  );
};
