import { useEffect, useState } from "react";
import { Card } from "../../presentation/Card";

export const Carousel = ({ allShows }) => {
  const getDisplayedShows = (limit) => {
    const list = new Array(limit).fill(0);

    const displayedShows = list.map(() => {
      const randomShow = Math.random() * allShows.length + 1;
      
      return allShows[Math.floor(randomShow)];
    });
    return displayedShows;
  };
  const [displayedShows, setDisplayedShows] = useState();
  useEffect(() => {
    const shows = getDisplayedShows(3);

    setDisplayedShows(shows);
  }, []);
  return (
    <div style={{}}>
      {displayedShows?.map((show) => (
        <Card cardImage={show.image} title={show.title} />
      ))}
    </div>
  );
};
