import { useState, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Card } from "../presentation/Card";
import { usePlayer } from "../hooks/usePlayer";

const Preview = ({ currentShowId, setCurrentlyPlaying }) => {
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
  const [currentShow, setCurrentShow] = useState();
  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${currentShowId}`)
      .then((data) => data.json())
      .then((currentShow) => {
        setCurrentShow(currentShow);
      });
  }, []);
  return (
    <div className="show-preview">
      <h1>{currentShow?.title}</h1>
      <img src={currentShow?.seasons[0].image} width={100} height={100} />
      <p>{currentShow?.description}</p>
      <label for="seasons-dropdown">{season}</label>
      <select
        name="seasons"
        id="seasons-dropdown"
        onChange={(event) => {
          setSeason(event.target.value);
        }}
      >
        {currentShow?.seasons.map((season, index) => (
          <option value={index + 1}>{index + 1}</option>
        ))}
      </select>
    </div>
  );
};

export const Home = ({ shows, setCurrentlyPlaying }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [currentShowId, setCurrentShowId] = useState();

  return (
    <div className="grid-container">
      {showPreview ? (
        <Preview
          currentShowId={currentShowId}
          setCurrentlyPlaying={setCurrentlyPlaying}
        />
      ) : null}

      {shows.map((show, index) => (
        <li
          className="grid-item"
          key={index}
          onClick={() => {
            setCurrentShowId(show.id);
            setShowPreview(true);
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
