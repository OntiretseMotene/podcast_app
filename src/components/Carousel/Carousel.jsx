import { useEffect, useState } from "react";
import { Card } from "../../presentation/Card";

export const Carousel = ({ allShows }) => {
  console.log(allShows);
  const getDisplayedShows = (limit) => {
    const list = new Array(limit).fill(0);

    const displayedShows = list.map(() => {
      return allShows[0]; //Math.random() * allShows.length + 1];
    });
    console.log(allShows);
    return displayedShows;
  };
  const [displayedShows, setDisplayedShows] = useState();
  useEffect(() => {
    const shows = getDisplayedShows(3);
    console.log(shows);
    setDisplayedShows(shows);
  }, []);
  return (
    <div>
      {displayedShows?.map((show) => (
        <Card cardImage={show.image} title={show.title} />
      ))}
    </div>
  );
};
