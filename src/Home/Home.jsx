import { useState, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Card } from "../presentation/Card";
import { usePlayer } from "../hooks/usePlayer";

const Preview = ({ currentShowId, setCurrentlyPlaying, setShowPreview }) => {
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
  const [currentShow, setCurrentShow] = useState();
  const [favourites, setFavourites] = useLocalStorage("favourites", []);
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
      <img
        src={currentShow?.seasons[season - 1].image}
        width={100}
        height={100}
      />
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
      {currentShow?.seasons[season - 1].episodes.map((episode) => {
        return (
          <div>
            <h3>{episode.title}</h3>
            <p>{episode.description}</p>
            <button
              onClick={() => {
                setCurrentlyPlaying({
                  title: episode.title,
                  image: currentShow?.seasons[season - 1].image,
                  url: episode.file,
                });
                setShowPreview(false);
              }}
            >
              Play
            </button>
            {/* The below is the heart/favourites button */}
            <span
              onClick={() => {
                if (favourites.includes(JSON.stringify(episode))) {
                  const newList = favourites.filter(
                    (thisEpisode) =>
                      JSON.stringify(thisEpisode) !== JSON.stringify(episode)
                  );

                  setFavourites(newList);
                } else {
                  setFavourites([...favourites, episode]);
                }
              }}
              className={
                favourites.includes(episode)
                  ? "material-symbols-outlined green-bg"
                  : "material-symbols-outlined"
              }
            >
              favorite
            </span>
          </div>
        );
      })}
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
          setShowPreview={setShowPreview}
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
