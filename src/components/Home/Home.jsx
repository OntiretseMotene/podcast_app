import { useState, useContext, useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Card } from "../../presentation/Card";
import { usePlayer } from "../../hooks/usePlayer";
import Filters from "../Filters";
import { genres } from "../../types/genres";
import { Carousel } from "../Carousel/Carousel";

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
      <span
        className="material-symbols-outlined"
        onClick={() => setShowPreview(false)}
      >
        close
      </span>
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
                if (
                  favourites.find((element) => {
                    return (
                      JSON.stringify(element.episode) ===
                      JSON.stringify(episode)
                    );
                  })
                ) {
                  const newList = favourites.filter(
                    (thisEpisode) =>
                      JSON.stringify(thisEpisode.episode) !==
                      JSON.stringify(episode)
                  );

                  setFavourites(newList);
                } else {
                  // add show that episode belongs to
                  const date = new Date();
                  setFavourites([
                    ...favourites,
                    { episode, currentShow, date, season },
                  ]);
                }
              }}
              className={
                favourites.find((element) => {
                  return (
                    JSON.stringify(element.episode) === JSON.stringify(episode)
                  );
                })
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
      {shows.length > 0 ? <Carousel allShows={shows} /> : null}
      {showPreview ? (
        <Preview
          currentShowId={currentShowId}
          setCurrentlyPlaying={setCurrentlyPlaying}
          setShowPreview={setShowPreview}
        />
      ) : null}

      {shows.map((show, index) => {
        const Data = (
          <>
            <p className="show-data">
              {show.genres.map((genre) => genres[genre]).join(", ")}
            </p>
            <p className="show-data">Seasons:{show.seasons}</p>
          </>
        );

        return (
          <div
            className="grid-item"
            key={index}
            onClick={() => {
              setCurrentShowId(show.id);
              setShowPreview(true);
            }}
          >
            <Card cardImage={show.image} title={show.title} data={Data} />
          </div>
        );
      })}
    </div>
  );
};
