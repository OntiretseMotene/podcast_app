import { useState, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Card } from "../presentation/Card";
import { usePlayer } from "../hooks/usePlayer";

const Preview = ({ currentShow, setCurrentlyPlaying }) => {
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
  // const url = currentShow.seasons[season].episodes[episode].file;

  return <>{/* <div>{url}</div> */}</>;
};

export const Home = ({ shows, setCurrentlyPlaying }) => {
  const { setId, playerContext } = usePlayer();

  const [currentShow, setCurrentShow] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const getSingleShow = (id) => {
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then((data) => data.json())
      .then((show) => {
        setCurrentShow(show);
      });
  };
  return (
    <div>
      {/* {showPreview ? (
        <Preview
          currentShow={currentShow}
          setCurrentlyPlaying={setCurrentlyPlaying}
        />
      ) : null} */}

      {shows.map((show, index) => (
        <li
          key={index}
          onClick={() => {
            getSingleShow(show.id);
            setShowPreview(true);
            setId(() => show.id);
            console.log(show.id);
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
